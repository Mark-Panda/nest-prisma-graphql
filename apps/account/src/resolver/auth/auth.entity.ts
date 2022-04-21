import { ApiProperty, ApiPropertyEnum } from '@app/public-decorator';

/**
 * 状态
 */
export const ACCOUNT_ROLE = ['USER', 'ADMIN', 'SYSTEM'];

export class AccountLoginDto {
    @ApiProperty('用户名')
    username!: string;

    @ApiProperty('密码')
    password!: string;
}

export class AdminLoginInfoDto {
    @ApiProperty('用户名')
    username!: string;

    @ApiProperty('邮箱')
    email!: string;

    @ApiPropertyEnum('角色', ACCOUNT_ROLE)
    role: string;

    @ApiProperty('token')
    access_token: string;
}

export class AdminInfoDto {
    @ApiProperty('用户名')
    username!: string;

    @ApiProperty('用户名')
    password!: string;
}

export class AccountAdmin {
    @ApiProperty('用户名')
    id!: string;

    @ApiProperty('用户名')
    username!: string;

    @ApiProperty('用户名')
    password!: string;
}
