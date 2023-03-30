import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from '../dtos/create-user.dto copy';
import { UpdateUserDto } from '../dtos/update-user.dto';
import { User, UserDocument } from '../model/user.model';
import * as bcrypt from 'bcrypt';
import { NotFoundException } from 'src/common/exceptions/not-found.exception';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    if (!!await this.userModel.findOne({"email":createUserDto.email}).exec()) throw new ConflictException("Email is registered");
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = new this.userModel({...createUserDto, password: hashedPassword});
    return createdUser.save();
  }

  // async findAllUsers(): Promise<User[]> {
  //   return this.userModel.find().exec();
  // }

  // async findUserById(id: string): Promise<User> {
  //   const user = await this.userModel.findById(id).exec();
  //   if (!user) {
  //       throw new NotFoundException(`User with id ${id} not found`);
  //   }
  //   return user;
  // }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userModel.findOne({email}).exec();
    if (!user) {
        throw new NotFoundException(`User with email ${email} not found`);
    }
    return user;
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    if (!user) {
        throw new NotFoundException(`User with id ${id} not found or update error`);
    }
    return user;
  }

  // async deleteUserById(id: string): Promise<User> {
  //   const user = await this.userModel.findByIdAndDelete(id).exec();
  //   if (!user) {
  //       throw new NotFoundException(`User with id ${id} not found`);
  //   }
  //   return user;
  // }
}
