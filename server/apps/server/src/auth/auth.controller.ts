import { Controller, Post, Body, Get } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

// 定义注册的数据传输对象
export class RegisterDto {
    @ApiProperty()
    username: string
    @ApiProperty()
    password: string
}

@Controller('auth')
@ApiTags('用户')
export class AuthController {

    constructor(
        @InjectModel(User) private userModel: ReturnModelType<typeof User>
    ) { }

    @Post('register')
    @ApiOperation({ summary: '注册' })
    async register(@Body() dto: RegisterDto) {
        const { username, password } = dto;
        const user = await this.userModel.create({
            username: username,
            password: password
        })
        return user
    }

    @Post('login')
    @ApiOperation({ summary: '登录' })
    async login(@Body() dto) {
        
        return dto
    }

    @Get('user')
    @ApiOperation({ summary: '获取个人信息' })
    async user() {
        return {}
    }
}
