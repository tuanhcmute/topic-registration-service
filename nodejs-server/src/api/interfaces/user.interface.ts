import { UserInstance, UserRoleInstance } from "@models";
import { IsNotEmpty, Length } from "class-validator";

export interface IUserProfile {
  profile: UserInstance;
}

export interface IListStudent {
  students?: UserRoleInstance[];
}

export interface IListLecture {
  lectures?: UserRoleInstance[];
}

export class UpdatedBio {
  @Length(0, 100, {
    message:
      "Biography must be between $constraint1 and $constraint2 characters",
  })
  @IsNotEmpty()
  public biography: string;
}
