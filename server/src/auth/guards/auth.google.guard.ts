import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AuthGoogleGuard extends AuthGuard('google') {
  async canActivate(context: ExecutionContext) {
    const canActivate = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    await super.logIn(request);
    return canActivate;
  }
}
