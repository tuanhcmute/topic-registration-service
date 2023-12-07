import { DataTypes, Model } from "sequelize";
import db from "../configs/db.config";
import { POSTFIX } from "@configs/constants";

interface RoleAttributes {
  id?: string;
  code: string;
  description: string;
  createdBy?: string;
  createdDate?: string;
  updatedDate?: string;
}

interface RoleInstance extends Model<RoleAttributes>, RoleAttributes {}

const modelName: string = "role";
const Role = db.define<RoleInstance>(
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
  { timestamps: false, tableName: "role_tbl" }
);

export { Role, RoleAttributes, RoleInstance };
