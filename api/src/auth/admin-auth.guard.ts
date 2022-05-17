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
    console.log(context.getType());

    const ctx = GqlExecutionContext.create(context);
    console.log(ctx.getType(), '<<<', context.getType());

    // console.log(ctx.getArgs());
    // console.log(super.getAuthenticateOptions);
    // console.log();

    return super.canActivate(ctx);
  }

  handleRequest<TUser = any>(
    err: any,
    user: any,
    info: any,
    context: any,
    status?: any,
  ): TUser {
    console.log(err, user, info, context, status);

    return;
  }
}
