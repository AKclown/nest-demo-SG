import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UniqueCode } from './entities/UniqueCode';
import { ScheduleModule } from '@nestjs/schedule';
import { ShortLongMap } from './entities/ShortLongMap';
import { ShortLongMapService } from './short-long-map.service';
import { UniqueCodeService } from './unique-code.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory() {
        return {
          type: 'mysql',
          host: 'localhost',
          port: 3309,
          username: 'root',
          password: 'akclown',
          database: 'short-url',
          entities: [UniqueCode, ShortLongMap],
          synchronize: true,
          logging: true,
          poolSize: 10,
          connectorPackage: 'mysql2',
          extra: {
            authPlugin: 'sha256_password',
          },
        };
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, UniqueCodeService, ShortLongMapService],
})
export class AppModule { }
