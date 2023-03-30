import { Controller, Get, Post, Body, UseGuards, UseInterceptors, ClassSerializerInterceptor, Request, Delete, Put } from '@nestjs/common';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { Types } from 'mongoose';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';
import { UpdateUserDto } from '../dtos/update-user.dto';

@Controller('/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Get()
  // async getUsers(): Promise<User[]> {
  //   return this.userService.findAllUsers();
  // }

  @Post()
  async createUser(@Body() userData: User): Promise<User> {
    return this.userService.createUser(userData);
  }

  @Put()
  async updateUser(@Body() id: string, updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.updateUser(id, updateUserDto);
  }

  // @Get(':id')
  // async getUserById(@Param('id') id: string): Promise<User> {
  //   if (!Types.ObjectId.isValid(id)) {
  //     throw new NotFoundException('User not found, invalid id');
  //   }
  //   return this.userService.findUserById(id);
  // }

  // @Delete(':id')
  // async deleteUserById(@Param('id') id:string): Promise<User>{
  //   return this.userService.deleteUserById(id);
  // }

  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  @Get('profile')
  async getUserProfile(@Request() req): Promise<User> {
    return req.user;
  }
}
