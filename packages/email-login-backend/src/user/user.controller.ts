import {
  Controller,
  Post,
  Body,
  Inject,
  UnauthorizedException,
  HttpCode,
} from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './dto/login-user.dto';
import { RedisService } from 'src/redis/redis.service';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Inject()
  private redisService: RedisService;

  @Inject(JwtService)
  private jwtService: JwtService;

  @Post('login')
  @HttpCode(200)
  async login(@Body() loginUserDto: LoginUserDto) {
    const { email, code } = loginUserDto;

    const codeInRedis = await this.redisService.get(`captcha_${email}`);
    console.log('codeInRedis: ', codeInRedis);

    if (!codeInRedis) {
      throw new UnauthorizedException('验证码已失效');
    }

    if (code !== codeInRedis) {
      throw new UnauthorizedException('验证码不正确');
    }

    const user = await this.userService.findUserByEmail(email);

    if (user) {
      const token = await this.jwtService.sign({
        user: {
          id: user.id,
          username: user.username,
        },
      });
      return {
        userInfo: {
          username: user.username,
          email: user.email,
        },
        token,
      };
    } else {
      return new UnauthorizedException('未找到用户');
    }
  }
}
