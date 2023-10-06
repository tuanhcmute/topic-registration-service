import { DataTypes, Model } from "sequelize";
import db from "../configs/db.config";

interface UserAttributes {
  id: string;
  code: string;
  role: string;
  email: string;
  image_url: string;
  full_name: string;
  phone_number: string;
  provider_id: string;
  password: string;
  provider: string;
  biography: string;
  schoolYear: Date;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
  classId?: string;
  specializationId?: string;
  majorId?: string;
}

interface UserInstance extends Model<UserAttributes>, UserAttributes {}

const User = db.define<UserInstance>(
  "user",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: "id",
    },
    code: {
      type: DataTypes.STRING,
      field: "code",
    },
    role: {
      type: DataTypes.STRING,
      field: "role",
    },
    email: {
      type: DataTypes.STRING,
      field: "email",
    },
    image_url: {
      type: DataTypes.STRING,
      field: "image_url",
    },
    full_name: {
      type: DataTypes.STRING,
      field: "full_name",
    },
    phone_number: {
      type: DataTypes.STRING,
      field: "phone_number",
    },
    provider_id: {
      type: DataTypes.STRING,
      field: "provider_id",
    },
    password: {
      type: DataTypes.STRING,
      field: "password",
    },
    provider: {
      type: DataTypes.STRING,
      field: "provider",
    },
    biography: {
      type: DataTypes.STRING,
      field: "biography",
    },
    schoolYear: {
      type: DataTypes.DATE,
      field: "school_year",
    },
    createdBy: {
      type: DataTypes.STRING,
      field: "created_by",
    },
    createdDate: {
      type: DataTypes.DATE,
      field: "created_date",
    },
    updatedDate: {
      type: DataTypes.DATE,
      field: "updated_date",
    },
    classId: {
      type: DataTypes.STRING,
      field: "class_id",
    },
    specializationId: {
      type: DataTypes.STRING,
      field: "specialization_id",
    },
    majorId: {
      type: DataTypes.STRING,
      field: "major_id",
    },
  },
  {
    timestamps: false,
    tableName: "User",
  }
);

export { User, UserAttributes, UserInstance };
