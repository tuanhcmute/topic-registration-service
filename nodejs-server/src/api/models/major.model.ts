import db from "../configs/db.config";
import { DataTypes, Model } from "sequelize";
import { User } from "./user.model";

interface MajorAttributes {
  id: string;
  code: string;
  description?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}

interface MajorInstance extends Model<MajorAttributes>, MajorAttributes {}

const Major = db.define<MajorInstance>(
  "Major",
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
    description: {
      type: DataTypes.STRING,
      field: "description",
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
  },
  {
    timestamps: false,
    tableName: "Major",
  }
);

Major.hasMany(User, { foreignKey: "majorId" });
User.belongsTo(Major, { foreignKey: "id", as: "major" });

export { MajorInstance, MajorAttributes, Major };
