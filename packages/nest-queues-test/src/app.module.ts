import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BullModule } from '@nestjs/bull';
import { OptimizeModule } from './optimize/optimize.module';

@Module({
  imports: [
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379,
        db: 2,
      },
    }),
    OptimizeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
