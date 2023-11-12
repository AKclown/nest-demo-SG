import { SetMetadata } from '@nestjs/common';

export const RequireLogin = () => SetMetadata('require-login', true);

export const RequestPermission = (...permissions: string[]) =>
  SetMetadata('require-permission', permissions);
