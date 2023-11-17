import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Inject(RedisService)
  private redisService: RedisService;

  @Get('addPos')
  async addPos(
    @Query('name') posName: string,
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
  ) {
    if (!posName || !longitude || !latitude) {
      throw new BadRequestException('位置信息不全');
    }
    try {
      return await this.redisService.geoAdd('positions', posName, [
        longitude,
        latitude,
      ]);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get('allPos')
  async allPos() {
    return this.redisService.geoList('positions');
  }

  @Get('pos')
  async pos(@Query('name') name: string) {
    return this.redisService.geoPos('positions', name);
  }

  @Get('nearBySearch')
  async nearBySearch(
    @Query('longitude') longitude: number,
    @Query('latitude') latitude: number,
    @Query('radius') radius: number,
  ) {
    if (!longitude || !latitude) {
      throw new BadRequestException('缺少位置信息');
    }

    if (!radius) {
      throw new BadRequestException('缺少搜搜半径');
    }

    return this.redisService.geoSearch(
      'positions',
      [longitude, latitude],
      radius,
    );
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
