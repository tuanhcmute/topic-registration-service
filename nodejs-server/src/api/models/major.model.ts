import { DataTypes, Model } from "sequelize";
import db from "../configs/db.config";
import { POSTFIX } from "@configs/constants";

interface MajorAttributes {
  id?: string;
  code: string;
  name: string;
  description?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}

interface MajorInstance extends Model<MajorAttributes>, MajorAttributes {}

const modelName: string = "major";
const Major = db.define<MajorInstance>(
  modelName,
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "id".concat(POSTFIX),
      defaultValue: DataTypes.UUIDV4
    },
    code: {
      type: DataTypes.STRING,
      field: "code".concat(POSTFIX),
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      field: "name".concat(POSTFIX),
      unique: false,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      field: "description".concat(POSTFIX)
    },
    createdBy: {
      type: DataTypes.STRING,
      field: "created_by".concat(POSTFIX)
    },
    createdDate: {
      type: DataTypes.DATE,
      field: "created_date".concat(POSTFIX),
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    updatedDate: {
      type: DataTypes.DATE,
      field: "updated_date".concat(POSTFIX),
      allowNull: false,
      defaultValue: DataTypes.NOW
    }
  },
  {
    timestamps: false,
    tableName: "major_tbl"
  }
);

export { MajorInstance, MajorAttributes, Major };
