import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const AuthAdmin = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    return ctx.switchToHttp().getRequest().user;
  },
);
