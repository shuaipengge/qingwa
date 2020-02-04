import { ApiProperty } from "@nestjs/swagger"

// 定义登录的数据传输对象
export class LoginDto {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
}