import { Module } from '@nestjs/common';
import { OptimizeController } from './optimize.controller';
import { BullModule } from '@nestjs/bull';
import { ImageProcessor } from './optimize.processor';
import { OptimizeService } from './optimize.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'image',
    }),
  ],
  controllers: [OptimizeController],
  providers: [ImageProcessor, OptimizeService],
})
export class OptimizeModule { }
