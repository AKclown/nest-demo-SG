import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { UniqueCode } from './entities/UniqueCode';
import { EntityManager } from 'typeorm';
import { generateRandomStr } from 'src/utils';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UniqueCodeService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  async generateCode() {
    const str = generateRandomStr(6);

    const uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      code: str,
    });

    if (!uniqueCode) {
      const code = new UniqueCode();
      code.code = str;
      code.status = 0;
      // $ insert可优化，每次可以insert 10、20个，批量insert
      await this.entityManager.insert(UniqueCode, code);
      return code;
    } else {
      return this.generateCode();
    }
  }

  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async batchGenerateCode() {
    // $ 每天凌晨四点提前生成短链
    for (let i = 0; i < 1000; i++) {
      this.generateCode();
    }
  }
}
