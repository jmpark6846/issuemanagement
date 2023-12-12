import { PassportStrategy } from '@nestjs/passport';
import { Strategy as LocalPassportStrategy } from 'passport-local';
import { ExtractJwt, Strategy as JWTPassportStrategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LocalStrategy extends PassportStrategy(LocalPassportStrategy) {
  constructor(private authService: AuthService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}

@Injectable()
export class JWTStrategy extends PassportStrategy(JWTPassportStrategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: any) {
    return { id: payload.id, email: payload.email };
  }
}
