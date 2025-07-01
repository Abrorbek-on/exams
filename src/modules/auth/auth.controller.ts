import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { registerDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { VerificationDto } from './dto/verify.dto';
import { refreshtokenDto } from './dto/refresh-token.dto';
import { sendVerifyDto } from './dto/sendVerification.dto';
import { resetPasswordDto } from './dto/reset.password.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() payload: registerDto){
        return  this.authService.register(payload)
    }

    @Post("verify")
    verify(@Body() payload: VerificationDto){
        return  this.authService.verify(payload)
     }

    @Post("login")
    login(@Body() payload: loginDto){
       return  this.authService.login(payload)
    }

    @Post("refresh-token")
    refreshtoken(@Body() token: refreshtokenDto){
       return  this.authService.refreshtoken(token)
    }

    @Post("send-verify")
    sendVerify(@Body() payload: sendVerifyDto){
       return  this.authService.sendVerify(payload)
    }

   @Post("reset-password")
   resetPassword(@Body() payload: resetPasswordDto) {
      return this.authService.resetPassword(payload)
   }
}
