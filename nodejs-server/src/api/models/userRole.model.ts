import { DataTypes, Model } from "sequelize";
import db from "../configs/db.config";
import { POSTFIX } from "@configs/constants";
import { User } from "./user.model";
import { Role } from "./role.model";

interface UserRoleAttributes {
  id?: string;
  userId: string;
  roleId: string;
  createdBy?: string;
  createdDate?: string;
  updatedDate?: string;
}

interface UserRoleInstance
  extends Model<UserRoleAttributes>,
    UserRoleAttributes {}

const modelName: string = "userRole";
const UserRole = db.define<UserRoleInstance>(
  modelName,
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "id".concat(POSTFIX),
      defaultValue: DataTypes.UUIDV4,
    },
    userId: {
      type: DataTypes.UUID,
      field: "user_id".concat(POSTFIX),
    },
    roleId: {
      type: DataTypes.UUID,
      field: "role_id".concat(POSTFIX),
    },
    createdBy: {
      type: DataTypes.STRING,
      field: "created_by".concat(POSTFIX),
    },
    createdDate: {
      type: DataTypes.DATE,
      field: "created_date".concat(POSTFIX),
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
    updatedDate: {
      type: DataTypes.DATE,
      field: "updated_date".concat(POSTFIX),
      defaultValue: DataTypes.NOW,
      allowNull: true,
    },
  },
  { timestamps: false, tableName: "user_role_tbl" }
);

// Setup a One-to-Many relationship between User and UserRole
User.hasMany(UserRole, { as: "userRoles" });
UserRole.belongsTo(User, { foreignKey: "userId", as: "user" });

// Also setup a One-to-Many relationship between Role and UserRole
Role.hasMany(UserRole, { as: "userRoles" });
UserRole.belongsTo(Role, { foreignKey: "roleId", as: "role" });

export { UserRole, UserRoleAttributes, UserRoleInstance };
