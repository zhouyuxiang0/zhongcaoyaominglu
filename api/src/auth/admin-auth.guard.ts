import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class AdminAuthGuard extends AuthGuard('local') implements CanActivate {
  constructor() {
    super();
  }
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    console.log('canActivate');

    return super.canActivate(context);
  }

  getRequest(context: ExecutionContext) {
    console.log('getRequest');

    const ctx = GqlExecutionContext.create(context);
    return ctx.getContext().req;
  }
}
