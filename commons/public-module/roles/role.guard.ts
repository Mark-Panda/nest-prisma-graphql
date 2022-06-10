import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './role.decorator';
import { Role } from './role.enum';
import { prisma } from 'commons/public-tool/prisma';

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
        if (!username) return false;
        const userRole = await prisma.user.findUnique({
            where: { username },
            select: { role: true },
        });
        if (!userRole) return false;
        return requiredRoles.some((role) => userRole.role?.includes(role));
    }
}
