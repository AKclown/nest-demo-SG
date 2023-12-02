import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
  Query,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ShortLongMapService } from './short-long-map.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ShortLongMapService)
  private shortLongMapService: ShortLongMapService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get(':code')
  @Redirect()
  async jump(@Param('code') code: string) {
    const longUlr = await this.shortLongMapService.getLongUrl(code);
    if (!longUlr) {
      throw new BadRequestException('短链不存在');
    }
    return {
      url: longUlr,
      statusCode: 302,
    };
  }

  @Get('short-url')
  async generateShortUrl(@Query('url') longUrl) {
    return await this.shortLongMapService.generate(longUrl);
  }
}
