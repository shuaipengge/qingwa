import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

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
    @UseGuards(AuthGuard('local'))
    async login(@Body() dto: LoginDto, @Req() req) {

        return req.user
    }

    @Get('user')
    @ApiOperation({ summary: '获取个人信息' })
    async user() {
        return {}
    }
}
