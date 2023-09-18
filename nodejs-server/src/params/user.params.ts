import { IsDate, IsEmail, Length, MaxLength } from "class-validator";

export class CreateUserData {
  @MaxLength(50)
  firstName!: string;

  @MaxLength(50)
  lastName!: string;

  @MaxLength(10)
  gender!: string;

  @IsEmail()
  email!: string;

  @IsDate()
  dob!: Date;

  @MaxLength(100)
  username!: string;

  @MaxLength(255)
  password!: string;

  @MaxLength(10)
  role!: string;
}
