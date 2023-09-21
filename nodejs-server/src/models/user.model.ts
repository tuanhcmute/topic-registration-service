import { DataTypes, Model } from "sequelize";
import db from "../configs/db.config";

interface UserAttributes {
  id?: number;
  username: string;
  password?: string;
  email?: string | null;
  role: string;
  oauthProvider?: string | null;
  googleId?: string | null;
  enable: boolean;
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
    username: {
      type: DataTypes.STRING,
      field: "username",
    },
    password: {
      type: DataTypes.STRING,
      field: "password",
    },
    email: {
      type: DataTypes.STRING,
      field: "email",
    },
    oauthProvider: {
      type: DataTypes.STRING,
      field: "oauth_provider",
      allowNull: true,
    },
    googleId: {
      type: DataTypes.STRING,
      field: "oauth_id",
    },
    role: {
      type: DataTypes.STRING,
      field: "role",
    },
    enable: {
      type: DataTypes.BOOLEAN,
      field: "enable",
    },
  },
  {
    timestamps: false,
    tableName: "Users",
  }
);

export { User, UserAttributes, UserInstance };
