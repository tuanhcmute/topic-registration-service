import { IsEmail, MaxLength } from "class-validator";

export class CreateUserData {
  @IsEmail()
  email!: string;

  @MaxLength(100)
  username!: string;

  @MaxLength(255)
  password!: string;

  @MaxLength(10)
  role!: string;
}
