import { DataTypes, Model } from "sequelize";
import db from "../configs/db.config";
import { POSTFIX } from "@configs/constants";
import { Clazz } from "./clazz.model";
import { Major } from "./major.model";

interface UserAttributes {
  id: string;
  ntid?: string;
  email?: string;
  imageUrl?: string;
  name?: string;
  phoneNumber?: string;
  providerId?: string;
  password?: string;
  provider?: string;
  biography?: string;
  schoolYear?: Date;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  clazzId?: string;
  majorId?: string;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

const modelName: string = "user";
const User = db.define<UserInstance>(
  modelName,
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "id".concat(POSTFIX),
      defaultValue: DataTypes.UUIDV4,
    },
    ntid: {
      type: DataTypes.STRING,
      field: "ntid".concat(POSTFIX),
      unique: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      field: "email".concat(POSTFIX),
      unique: true,
      allowNull: false,
    },
    imageUrl: {
      type: DataTypes.STRING,
      field: "image_url".concat(POSTFIX),
    },
    name: {
      type: DataTypes.STRING,
      field: "name".concat(POSTFIX),
    },
    phoneNumber: {
      type: DataTypes.STRING,
      field: "phone_number".concat(POSTFIX),
    },
    providerId: {
      type: DataTypes.STRING,
      field: "provider_id".concat(POSTFIX),
    },
    password: {
      type: DataTypes.STRING,
      field: "password".concat(POSTFIX),
    },
    provider: {
      type: DataTypes.STRING,
      field: "provider".concat(POSTFIX),
    },
    biography: {
      type: DataTypes.BLOB("long"),
      field: "biography".concat(POSTFIX),
    },
    schoolYear: {
      type: DataTypes.DATE,
      field: "school_year".concat(POSTFIX),
    },
    createdBy: {
      type: DataTypes.STRING,
      field: "created_by".concat(POSTFIX),
    },
    createdDate: {
      type: DataTypes.DATE,
      field: "created_date".concat(POSTFIX),
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedDate: {
      type: DataTypes.DATE,
      field: "updated_date".concat(POSTFIX),
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    clazzId: {
      type: DataTypes.UUID,
      field: "clazz_id".concat(POSTFIX),
    },
    majorId: {
      type: DataTypes.UUID,
      field: "major_id".concat(POSTFIX),
    },
  },
  {
    timestamps: false,
    tableName: "user_tbl",
  }
);

Major.hasMany(User, { foreignKey: "majorId", as: "users" });
User.belongsTo(Major, { as: "major" });

Clazz.hasMany(User, { foreignKey: "clazzId", as: "users" });
User.belongsTo(Clazz, { as: "clazz" });

export { User, UserAttributes, UserInstance };
