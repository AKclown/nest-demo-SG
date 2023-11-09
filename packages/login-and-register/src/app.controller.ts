import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { Request } from 'express';
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('test1')
  @UseGuards(LoginGuard)
  test1(@Req() req: Request) {
    console.log('req: ', (req as any).user);
    return 'test1';
  }

  @Get('test2')
  @UseGuards(LoginGuard)
  test2() {
    return 'test2';
  }
}
