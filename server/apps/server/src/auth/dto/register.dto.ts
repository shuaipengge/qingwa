import { ApiProperty } from "@nestjs/swagger"

// 定义注册的数据传输对象
export class RegisterDto {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
}