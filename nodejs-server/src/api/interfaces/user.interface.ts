import { UserInstance, UserRoleInstance } from "@models";
import { IsEmail, IsNotEmpty, Length } from "class-validator";
import { messaging } from "firebase-admin";

export interface IUserProfile {
  profile: UserInstance;
}

export interface IListStudent {
  students?: UserRoleInstance[];
}

export interface IListLecture {
  lectures?: UserRoleInstance[];
}

export interface IListUserResponse {
  users?: UserInstance[];
}

export interface UserResponse {}

export class UpdatedBio {
  @Length(0, 100, {
    message: "Biography must be between $constraint1 and $constraint2 characters"
  })
  @IsNotEmpty()
  public biography: string;
}

export class UserRequest {
  @IsEmail({}, { message: "Email is not valid" })
  public email: string;
  @IsNotEmpty({ message: "Name is not empty" })
  public name: string;
  @IsNotEmpty({ message: "Ntid is not empty" })
  public ntid: string;
  @IsNotEmpty({ message: "Major is not empty" })
  public majorId: string;
  @IsNotEmpty({ message: "Class is not empty" })
  public clazzId: string;
  @IsNotEmpty({ message: "role is not empty" })
  public role: string[];
  public biography: string;
}
