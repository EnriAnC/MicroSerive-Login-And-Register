import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    UnauthorizedException,
  } from '@nestjs/common';
  import { Response } from 'express';
  
  @Catch(UnauthorizedException)
  export class AuthExceptionFilter implements ExceptionFilter {
    catch(exception: UnauthorizedException, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      
      if (exception.message === 'Invalid email or password') {
        response.status(401).json({
          statusCode: 401,
          message: 'Invalid email or password',
        });
      } else {
        response.status(401).json({
          statusCode: 401,
          message: 'Unauthorized',
        });
      }
    }
  }
  