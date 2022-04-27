import { ApiProperty, ApiPropertyEnum } from 'commons/public-decorator';

/**
 * 状态
 */
export const ACCOUNT_ROLE = ['USER', 'ADMIN', 'SYSTEM'];

export class LoginDto {
    @ApiProperty('用户名')
    username!: string;

    @ApiProperty('密码')
    password!: string;
}

export class UserInfoResponse {
    @ApiProperty('用户ID')
    id!: string;

    @ApiProperty('用户名')
    username!: string;

    @ApiProperty('邮箱')
    email!: string;

    @ApiProperty('手机号')
    phone!: string;

    @ApiPropertyEnum('角色', ACCOUNT_ROLE)
    role: string;
}

export class LoginInfoResponse extends UserInfoResponse {
    @ApiProperty('token')
    accessToken: string;

    @ApiProperty('续租token')
    refreshToken: string;
}

export class RegisternInfoDto {
    @ApiProperty('用户名')
    username!: string;

    @ApiProperty('用户名')
    password!: string;

    @ApiProperty('邮箱')
    email!: string;

    @ApiProperty('手机号')
    phone: string;
}

export class AccountAdmin {
    @ApiProperty('用户ID')
    id!: string;

    @ApiProperty('用户名')
    username!: string;

    // @ApiProperty('用户名')
    // password!: string;
}
