import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) { }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();

        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return false;
        }

        try {
            const decoded = await this.jwtService.verifyAsync(token);
            req.user = decoded;
            return true;
        } catch (err) {
            return false;
        }
    }
}
