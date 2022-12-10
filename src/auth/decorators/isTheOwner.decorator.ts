import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const isTheOwner = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const owner = request.user;

  

  return owner;
});