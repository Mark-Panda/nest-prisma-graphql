import { ApiProperty } from 'commons/public-decorator';

export class CommonResponse {
    @ApiProperty('成功数据信息')
    data!: object | string;

    @ApiProperty('信息内容')
    message!: string;
}
