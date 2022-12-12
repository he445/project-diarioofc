import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const isTheProfile = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const profile = request.profile;
  console.log(profile)
  

  return profile;
});