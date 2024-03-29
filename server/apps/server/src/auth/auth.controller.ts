import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserDocment } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';
import { AuthGuard } from '@nestjs/passport'
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtService } from '@nestjs/jwt'
import { CurrentUser } from './current-user.decorator';

@Controller('auth')
@ApiTags('用户')
export class AuthController {

    constructor(
        private jwtService: JwtService,
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
    async login(@Body() dto: LoginDto, @CurrentUser() user: UserDocment) {

        return {
            token: this.jwtService.sign(String(user._id))
        }
    }

    @Get('user')
    @ApiOperation({ summary: '获取个人信息' })
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async user(@CurrentUser() user: UserDocment) {
        return user
    }
}
