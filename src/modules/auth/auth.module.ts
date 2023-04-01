import { Module } from '@nestjs/common';
import { UserModule } from '../user/user.module';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';
import { config } from 'dotenv';
config()

@Module({
  imports: [
    UserModule, // importa el UserModule
    PassportModule, // importa el PassportModule
    JwtModule.register({
      secret: process.env.JWT_SECRET, // secreto utilizado para firmar el token
      signOptions: { expiresIn: `${Number(process.env.JWT_EXPIRATION_TIME)}h`}, // opciones de firma del token
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService], // exporta AuthService para su uso en otros módulos
})
export class AuthModule {}
