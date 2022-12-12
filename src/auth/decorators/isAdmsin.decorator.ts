import { createParamDecorator, ExecutionContext, UnauthorizedException } from '@nestjs/common';

export const isAdmin = createParamDecorator((_, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  const user = request.user;
  console.log(user)
 if(user.role === "admin"){
    return true;
 }

 throw new UnauthorizedException(
    'user not have permission to access this route',
  );
});

