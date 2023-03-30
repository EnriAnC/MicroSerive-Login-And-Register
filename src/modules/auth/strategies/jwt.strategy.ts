import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { LoginUserDto } from '../dtos/login-user.dto';
import { AuthService } from '../services/auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'mysecretkey', // secreto utilizado para verificar el token
    });
  }

  async validate(payload: LoginUserDto) {
    const { email, password } = payload
    return await this.authService.validateUser(email, password);
  }
}
