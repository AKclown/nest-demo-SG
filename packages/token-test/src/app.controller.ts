import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Inject,
  Req,
  Request,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDto } from './user.dto';
import { JwtService } from '@nestjs/jwt';

const users = [
  { username: 'AKclown', password: '123456', email: 'xxx@xxx.com' },
  { username: 'dong', password: '222222', email: 'yyy@yyy.com' },
];

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('login')
  login(@Body() userDto: UserDto) {
    const user = users.find((item) => item.username === userDto.username);
    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    if (user.password !== userDto.password) {
      throw new BadRequestException('密码错误');
    }

    const accessToken = this.jwtService.sign(
      {
        username: user.username,
        email: user.email,
      },
      { expiresIn: '0.5h' },
    );

    const refreshToken = this.jwtService.sign(
      {
        username: user.username,
        email: user.email,
      },
      { expiresIn: '7d' },
    );

    return {
      userInfo: {
        username: user.username,
        email: user.email,
      },
      accessToken,
      refreshToken,
    };
  }

  @Get('token')
  token(@Req() req: Request) {
    const authorization = req.headers['authorization'];
    if (!authorization) {
      throw new UnauthorizedException('用户未登录');
    }

    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify(token);
      return 'success';
    } catch (error) {
      throw new UnauthorizedException('token失效! 请重新登陆');
    }
  }

  @Get('refresh')
  refresh(@Query('token') token: string) {
    try {
      const data = this.jwtService.verify(token);
      const user = users.find((item) => item.username === data.username);
      const accessToken = this.jwtService.sign(
        {
          username: user.username,
          email: user.email,
        },
        { expiresIn: '0.5h' },
      );

      const refreshToken = this.jwtService.sign(
        {
          username: user.username,
          email: user.email,
        },
        { expiresIn: '7d' },
      );
      return {
        accessToken,
        refreshToken,
      };
    } catch (error) {
      throw new UnauthorizedException('token 失效，请重新登录');
    }
  }
}
