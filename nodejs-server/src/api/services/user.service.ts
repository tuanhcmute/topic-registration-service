import { StatusCodes } from "http-status-codes";
import {
  User,
  Major,
  Clazz,
  UserRole,
  Role,
  UserRoleInstance,
  TopicEnrollment,
} from "@models";
import {
  UserNotFoundException,
  ErrorMessages,
  ValidateFailException,
} from "@exceptions";
import {
  IListLecture,
  IListStudent,
  IResponseModel,
  IUserProfile,
  ResponseModelBuilder,
} from "@interfaces";
import { RoleCode } from "@configs/constants";
import _ from "lodash";

class UserService {
  public getStudentsNotEnrolledInTopic = async (): Promise<
    IResponseModel<IListStudent>
  > => {
    // Get and validate role
    const studentRole = await Role.findOne({
      where: {
        code: RoleCode.ROLE_STUDENT,
      },
    });
    if (_.isNull(studentRole))
      throw new ValidateFailException("Student role could not be found");

    // Get students
    const userRoles = await UserRole.findAll({
      where: {
        roleId: studentRole.id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["ntid", "name"],
        },
      ],
      attributes: ["userId"],
      raw: true,
      nest: true,
    });

    //  Filter students are not enrolled (NOT performance)
    let filterStudent: UserRoleInstance[] = [];
    for (const item of userRoles) {
      const topicEnrollment = await TopicEnrollment.findOne({
        where: {
          studentId: item.userId,
        },
      });
      if (_.isNull(topicEnrollment)) filterStudent.push(item);
    }
    const data: IListStudent = {
      students: filterStudent,
    };
    return new ResponseModelBuilder<IListStudent>()
      .withMessage("The list of students has been successfully retrieved")
      .withStatusCode(StatusCodes.OK)
      .withData(data)
      .build();
  };

  public getUserProfile = async (
    email: string
  ): Promise<IResponseModel<IUserProfile>> => {
    try {
      // Get current user
      const foundUser = await User.findOne({
        where: { email },
        include: [
          {
            model: Major,
            as: "major",
            attributes: ["code", "name"],
          },
          {
            model: Clazz,
            as: "clazz",
            attributes: ["code", "description"],
          },
          {
            model: UserRole,
            as: "userRoles",
            include: [{ model: Role, as: "role", attributes: ["code"] }],
            attributes: {
              exclude: [
                "userId",
                "roleId",
                "createdBy",
                "createdDate",
                "updatedDate",
              ],
            },
          },
        ],
        attributes: [
          "ntid",
          "email",
          "imageUrl",
          "name",
          "phoneNumber",
          "biography",
          "schoolYear",
        ],
      });

      // Validate user
      if (!foundUser)
        throw new UserNotFoundException(
          ErrorMessages.USER_NOT_FOUND + "with email: " + email
        );
      const data: IUserProfile = {
        profile: foundUser,
      };

      // Buid response
      return new ResponseModelBuilder<IUserProfile>()
        .withMessage("User's profile has been successfully retrieved")
        .withStatusCode(StatusCodes.OK)
        .withData(data)
        .build();
    } catch (err) {
      throw err;
    }
  };

  public updateUserBio = async (
    userId: string,
    bio: string
  ): Promise<boolean> => {
    try {
      const foundUser = await User.findByPk(userId);
      if (!foundUser)
        throw new UserNotFoundException(
          ErrorMessages.USER_NOT_FOUND + "with userId: " + userId
        );
      foundUser.biography = bio;
      await foundUser.save();
      return true;
    } catch (error) {
      throw error;
    }
  };

  public async getLecturesByMajor(
    majorCodeRequest: string
  ): Promise<IResponseModel<IListLecture>> {
    // Validate Major code
    if (
      _.isNull(majorCodeRequest) ||
      _.isUndefined(majorCodeRequest) ||
      _.isEmpty(majorCodeRequest)
    )
      throw new ValidateFailException("Major code is not valid");

    // Validate major
    const major = await Major.findOne({ where: { code: majorCodeRequest } });
    if (_.isNull(major))
      throw new ValidateFailException("Major could not be found");
    // Get and validate role
    const lectureRole = await Role.findOne({
      where: {
        code: RoleCode.ROLE_LECTURE,
      },
    });
    if (_.isNull(lectureRole))
      throw new ValidateFailException("Student role could not be found");

    // Get lectures
    const userRoles = await UserRole.findAll({
      where: {
        roleId: lectureRole.id,
      },
      include: [
        {
          model: User,
          as: "user",
          attributes: ["ntid", "name"],
        },
      ],
      attributes: ["userId"],
      raw: true,
      nest: true,
    });

    //  Filter lecture with major from client(NOT performance)
    let filterLectures: UserRoleInstance[] = [];
    for (const item of userRoles) {
      const user = await User.findOne({
        where: {
          id: item.userId,
          majorId: major.id,
        },
      });
      if (!_.isNull(user)) filterLectures.push(item);
    }

    // Build response
    const data: IListLecture = { lectures: filterLectures };
    return new ResponseModelBuilder<IListLecture>()
      .withStatusCode(StatusCodes.OK)
      .withMessage("The list of lectures has been successfully retrieved")
      .withData(data)
      .build();
  }
}

export default new UserService();
