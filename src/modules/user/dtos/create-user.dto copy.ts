import { IsNotEmpty, IsEmail, MinLength } from 'class-validator';

export class CreateUserDto {
  // @IsNotEmpty()
  // readonly id: string;

  @IsNotEmpty()
  readonly fullname: string;

  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  @MinLength(6)
  readonly password: string;
}
