import { DataTypes, Model } from "sequelize";

import db from "../configs/db.config";
import { POSTFIX } from "@configs/constants";

interface ClazzAttributes {
  id?: string;
  code: string;
  description?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}

interface ClazzInstance extends Model<ClazzAttributes>, ClazzAttributes {}

const modelName: string = "clazz";
const Clazz = db.define<ClazzInstance>(
  modelName,
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "id".concat(POSTFIX),
      defaultValue: DataTypes.UUIDV4,
    },
    code: {
      type: DataTypes.STRING,
      field: "code".concat(POSTFIX),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      field: "description".concat(POSTFIX),
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
  },
  {
    timestamps: false,
    tableName: "clazz_tbl",
  }
);

export { ClazzInstance, ClazzAttributes, Clazz };
