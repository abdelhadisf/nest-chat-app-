import { Body, Controller, Get, Param, Patch, Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import type { RequestWithUser } from 'src/auth/jwt.strategy';
import { UpdateUserDto } from 'src/dto/update-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService:UserService) {}

 @Get()
  getUsers() {  
    return this.userService.getUsers();
  }
  @Get('/:userId')
  getUser(@Param('userId') userId:string) {
    return this.userService.getUser({userId})
  }
  @UseGuards(JwtAuthGuard)

   @Patch('me')
  async updateMe(@Request() req: RequestWithUser, @Body() dto: UpdateUserDto) {
    return this.userService.updateUser({ userId: req.user.userId, data: { firstname: dto.firstname } });
  }

}


