import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { JWTAccessOptions } from '../config/jwt';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      let token = this.extractTokenFromHeader(request);
  
      if (!token) throw new UnauthorizedException();
      
  
      try {
        let payload = await this.jwtService.verifyAsync(token, JWTAccessOptions);
   
        let data =  request['user'] = payload;
        return true;  
      } catch (error) {
        throw new UnauthorizedException(error.name);
      }
    }
    private extractTokenFromHeader(request: Request): string | undefined {
      let [type, token] = request.headers.authorization?.split(' ') || [];
  
      return type == 'Bearer' ? token : undefined;
    }
  }
  