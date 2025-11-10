import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import type { RequestWithUser } from './jwt.strategy';
import { ResetUserPasswordDto } from 'src/dto/reset-user-password.dto';
export type AuthBody = {email:string;password:string ;}
export type CreateUser = {email: string ; firstname : string ; password : string ;}
@Controller('auth')
export class AuthController {
    constructor(private readonly  authService: AuthService,
        private readonly userService : UserService
    ) {}

    @Post('login') 
    async login (@Body() authBody : AuthBody) {
        return await this.authService.login({authBody}) ; 
    }

    @Post('register') 
    async register (@Body() registerBody : CreateUser) {
        return await this.authService.register({registerBody}) ; 
    }

      @Post('request-reset-password')
  async resetUserPasswordRequest(@Body('email') email: string) {
    return await this.authService.resetUserPasswordRequest({
      email,
    });
  }
    @Post('reset-password')
  async resetUserPassword(@Body() resetPasswordDto: ResetUserPasswordDto) {
    return await this.authService.resetUserPassword({
      resetPasswordDto,
    });
  }
  @Get('verify-reset-password-token')
  async verifyResetPasswordToken(@Query('token') token: string) {
    return await this.authService.verifyResetPasswordToken({
      token,
    });
  }
   

    @UseGuards(JwtAuthGuard)
    @Get() 
    async authenticateUser (@Request() req : RequestWithUser) {
        console.log(req.user.userId) ;
        return await this.userService.getUser({userId : req.user.userId}) ; 
    }
    
    
}
