import { Controller, Post, Body, Session } from '@nestjs/common';
import { UserService } from './user.service';
import { LoginUserDto } from './entities/login-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('login')
  async login(@Body() loginUser: LoginUserDto, @Session() session) {
    const user = await this.userService.login(loginUser);

    session.user = {
      id: user.id,
      username: user.username,
    };

    return 'success';
  }
}
