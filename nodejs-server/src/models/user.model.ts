import { DataTypes, Model } from "sequelize";
import db from "../configs/db.config";
import { Account } from "./account.model";

interface UserAttributes {
  id?: number;
  firstName: string;
  lastName: string;
  gender?: string | null;
  dob?: Date | null;
  email?: string | null;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

const User = db.define<UserInstance>(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    firstName: {
      type: DataTypes.STRING,
      field: "first_name",
    },
    lastName: {
      type: DataTypes.STRING,
      field: "last_name",
    },
    gender: {
      type: DataTypes.STRING,
      field: "gender",
    },
    dob: {
      type: DataTypes.DATE,
      field: "date_of_birth",
    },
    email: {
      type: DataTypes.STRING,
      field: "email",
    },
  },
  {
    timestamps: false,
    tableName: "users",
  }
);

User.hasOne(Account, { foreignKey: "userId" });
Account.hasOne(User, { foreignKey: "id" });

export { User, UserAttributes, UserInstance };
