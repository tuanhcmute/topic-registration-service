import { DataTypes, Model } from "sequelize";
import { POSTFIX } from "@configs/constants";
import db from "@configs/db.config";

interface SemesterAttributes {
  id?: string;
  type?: string;
  name?: string;
  status?: string;
  startDate?: Date;
  endDate?: Date;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}

interface SemesterInstance extends Model<SemesterAttributes>, SemesterAttributes {}

const modelName: string = "semester";
const Semester = db.define<SemesterInstance>(
  modelName,
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "id".concat(POSTFIX),
      defaultValue: DataTypes.UUIDV4
    },
    type: {
      type: DataTypes.STRING,
      field: "type".concat(POSTFIX)
    },
    name: {
      type: DataTypes.STRING,
      field: "name".concat(POSTFIX)
    },
    status: {
      type: DataTypes.STRING,
      field: "status".concat(POSTFIX)
    },
    startDate: {
      type: DataTypes.DATEONLY,
      field: "start_date".concat(POSTFIX)
    },
    endDate: {
      type: DataTypes.DATEONLY,
      field: "end_date".concat(POSTFIX)
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
    tableName: "semester_tbl"
  }
);

export { SemesterAttributes, SemesterInstance, Semester };
