import {
  BadRequestException,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {
  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: ExecutionContext,
  ): TUser {
    const request = context.switchToHttp().getRequest();
    const { email, password } = request.body;

    if (!email || !password) {
      throw new BadRequestException();
    } else if (err) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
