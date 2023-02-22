import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Body() data): Promise<any> {
    return this.authService.login(data);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('profile')
  async profile(): Promise<any> {
    return { like: 'ok' };
  }
}
