import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.enum';
import { prisma } from 'commons/public-tool/prisma';
import {
    ForbiddenError,
    AuthenticationError,
    DataQueryError,
} from 'commons/public-module/errors/errorsGql';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const ctx = GqlExecutionContext.create(context);
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(
            ROLES_KEY,
            [context.getHandler(), context.getClass()],
        );
        if (!requiredRoles) {
            return true;
        }
        // 查询来自JWT中给req中增加的userInfo，判断用户是谁
        const username = context.switchToHttp().getRequest()
            ? context.switchToHttp().getRequest().userInfo.username
            : ctx.getContext().req.userInfo.username;
        if (!username) {
            if (!context.switchToHttp().getRequest()) {
                throw new AuthenticationError('当前用户禁止访问');
            }
            return false;
        }
        const userRole = await prisma.user.findUnique({
            where: { username },
            select: { role: true },
        });
        if (!userRole) {
            if (!context.switchToHttp().getRequest()) {
                throw new DataQueryError('用户信息不匹配', null);
            }
            return false;
        }
        const isPass = requiredRoles.some((role) =>
            userRole.role?.includes(role),
        );
        if (!isPass) {
            if (!context.switchToHttp().getRequest()) {
                throw new ForbiddenError('当前用户无权访问');
            }
        }
        return isPass;
    }
}
