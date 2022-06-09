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

export class UserInfo {
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

export class LoginInfo extends UserInfo {
    @ApiProperty('token')
    accessToken: string;

    @ApiProperty('续租token')
    refreshToken: string;
}

export class UserInfoResponse {
    @ApiProperty('状态编码')
    code!: number;

    @ApiProperty('返回信息')
    data!: UserInfo;
}

export class LoginInfoResponse {
    @ApiProperty('状态编码')
    code!: number;

    @ApiProperty('返回信息')
    data!: LoginInfo;
}

export class RegisternInfoDto {
    @ApiProperty('用户名')
    username!: string;

    @ApiProperty('用户名')
    password!: string;

    @ApiProperty('邮箱')
    email!: string;
}

export class AccountAdmin {
    @ApiProperty('用户ID')
    id!: string;

    @ApiProperty('用户名')
    username!: string;

    // @ApiProperty('用户名')
    // password!: string;
}
