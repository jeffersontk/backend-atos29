// src/auth/auth.controller.ts
import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('login')
  async login(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.findOneByEmail(createUserDto.email);
    if (user && user.password === createUserDto.password) {
      return this.authService.login(user);
    }
    throw new UnauthorizedException();
  }
}
