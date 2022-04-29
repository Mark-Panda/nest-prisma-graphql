import { ApiProperty } from 'commons/public-decorator';

export class CommonResponse {
    @ApiProperty('状态编码')
    code!: number;

    @ApiProperty('返回信息')
    data!: object | string;
}
