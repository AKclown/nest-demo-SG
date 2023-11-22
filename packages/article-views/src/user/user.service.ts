import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { LoginUserDto } from './entities/login-user.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  async login(loginUser: LoginUserDto) {
    const user = await this.entityManager.findOne(User, {
      where: {
        username: loginUser.username,
      },
    });

    if (!user) {
      throw new BadRequestException('用户不存在');
    }

    if (user.password !== loginUser.password) {
      throw new UnauthorizedException('密码错误');
    }

    return user;
  }
}
