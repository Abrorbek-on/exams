import { SetMetadata } from '@nestjs/common';
import { UserRole } from '../types/types';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);