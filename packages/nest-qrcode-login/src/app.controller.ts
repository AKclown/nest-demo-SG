import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
  UnauthorizedException,
  Headers,
} from '@nestjs/common';
import { AppService } from './app.service';
import { randomUUID } from 'crypto';
import * as qrcode from 'qrcode';
import { JwtService } from '@nestjs/jwt';

// 模拟redis存储，使用map数据结构
const map = new Map<string, QrCodeInfo>();

interface QrCodeInfo {
  status:
    | 'noscan'
    | 'scan-wait-confirm'
    | 'scan-confirm'
    | 'scan-cancel'
    | 'expired';
  userInfo?: {
    userId: number;
  };
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(JwtService)
  private jwtService: JwtService;

  private users = [{ id: 1, username: 'Akclown', password: '111' }];

  @Get('login')
  async login(
    @Query('username') username: string,
    @Query('password') password: string,
  ) {
    const user = this.users.find((item) => item.username === username);
    if (!user) {
      throw new UnauthorizedException('用户不存在');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('密码错误');
    }

    return {
      token: await this.jwtService.sign({
        userId: user.id,
      }),
    };
  }

  @Get('userInfo')
  async userInfo(@Headers('Authorization') auth: string) {
    try {
      const [, token] = auth.split(' ');
      const info = await this.jwtService.verify(token);

      const user = this.users.find((item) => item.id == info.userId);
      return user;
    } catch (e) {
      throw new UnauthorizedException('token 过期，请重新登录');
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('qrcode/generate')
  async generate() {
    const uuid = randomUUID();
    const img = await qrcode.toDataURL(
      `http://192.168.3.108:3000/pages/confirm.html?id=${uuid}`,
    );

    // 缓存住生的二维码
    map.set(`qrcode_${uuid}`, {
      status: 'noscan',
    });

    return {
      qrcode_id: uuid,
      img,
    };
  }

  @Get('qrcode/check')
  async check(@Query('id') id: string) {
    return map.get(`qrcode_${id}`);
  }

  @Get('qrcode/scan')
  async scan(@Query('id') id: string, @Headers('Authorization') auth: string) {
    let user;
    try {
      const [, token] = auth.split(' ');
      const info = await this.jwtService.verify(token);

      user = this.users.find((item) => item.id == info.userId);
    } catch (e) {
      throw new UnauthorizedException('token 过期，请重新登录');
    }

    const info = map.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    map.set(`qrcode_${id}`, {
      ...info,
      status: 'scan-wait-confirm',
      userInfo: user,
    });
    return 'success';
  }

  @Get('qrcode/confirm')
  async confirm(
    @Query('id') id: string,
    @Headers('Authorization') auth: string,
  ) {
    let user;
    try {
      const [, token] = auth.split(' ');
      const info = await this.jwtService.verify(token);

      user = this.users.find((item) => item.id == info.userId);
    } catch (e) {
      throw new UnauthorizedException('token 过期，请重新登录');
    }

    const info = map.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    map.set(`qrcode_${id}`, {
      ...info,
      status: 'scan-confirm',
      userInfo: user,
    });

    return 'success';
  }

  @Get('qrcode/cancel')
  async cancel(@Query('id') id: string) {
    const info = map.get(`qrcode_${id}`);
    if (!info) {
      throw new BadRequestException('二维码已过期');
    }
    map.set(`qrcode_${id}`, { ...info, status: 'scan-cancel' });
    return 'success';
  }
}
