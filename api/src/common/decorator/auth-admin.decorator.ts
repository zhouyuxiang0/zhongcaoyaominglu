import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';

export const AuthAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const req = GqlExecutionContext.create(ctx).getContext().req;
    console.log(req.user);
    return GqlExecutionContext.create(ctx).getContext().req.user;
  },
);
