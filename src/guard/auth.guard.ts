import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  Logger,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.debug('🛡️ AuthGuard: Starting authentication check');

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    this.logger.debug(
      `🛡️ AuthGuard: Authorization header - ${authHeader ? 'present' : 'missing'}`,
    );

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.logger.warn('🛡️ AuthGuard: No Bearer token provided');
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.substring(7);
    this.logger.debug(
      `🛡️ AuthGuard: Extracted token - ${token.substring(0, 20)}...`,
    );

    try {
      const payload = this.jwtService.verify(token);
      this.logger.debug(
        `🛡️ AuthGuard: JWT verified successfully - userId: ${payload.sub}`,
      );

      (request as any)['userId'] = payload.sub;
      this.logger.debug(
        `🛡️ AuthGuard: UserId set in request context: ${payload.sub}`,
      );

      return true;
    } catch (error) {
      this.logger.error(
        `🛡️ AuthGuard: JWT verification failed - ${error instanceof Error ? error.message : 'Unknown error'}`,
      );
      throw new UnauthorizedException('Invalid token');
    }
  }
}
