import { Controller, Post, Body, UseFilters, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { LoginUserDto } from '../dtos/login-user.dto';
import { AuthExceptionFilter } from 'src/common/filters/auth-exception.filter';
import { JwtAuthGuard } from 'src/common/guards/JwtAuthGuard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseFilters(AuthExceptionFilter)
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('validate')
  @UseGuards(JwtAuthGuard)
  validateToken() {
    return { message: 'Token is valid' };
  }
}
