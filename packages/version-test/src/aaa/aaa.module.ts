import { Module } from '@nestjs/common';
import { AaaService } from './aaa.service';
import { AaaController } from './aaa.controller';
import { Aaa2Controller } from './aaa2.controller';

@Module({
  // $ 前面的controller优先命中，所以这个顺序很重要
  controllers: [Aaa2Controller, AaaController],
  providers: [AaaService],
})
export class AaaModule { }
