import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsString, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  fullname?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  password?: string;
}

export class UpdateUserPartialDto extends PartialType(UpdateUserDto) {}
