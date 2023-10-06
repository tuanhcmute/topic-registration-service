import db from "configs/db.config";
import { DataTypes, Model } from "sequelize";

interface SemesterAttributes {
  id: string;
  code: string;
  name: string;
  description?: string;
  active: string;
  startDate?: Date;
  endDate?: Date;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}

interface SemesterInstance
  extends Model<SemesterAttributes>,
    SemesterAttributes {}

const Semester = db.define<SemesterInstance>(
  "semester",
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
    name: {
      type: DataTypes.STRING,
      field: "name",
    },
    description: {
      type: DataTypes.STRING,
      field: "description",
    },
    active: {
      type: DataTypes.STRING,
      field: "active",
    },
    startDate: {
      type: DataTypes.DATE,
      field: "start_date",
    },
    endDate: {
      type: DataTypes.DATE,
      field: "end_date",
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
    tableName: "Semester",
  }
);

export { SemesterAttributes, SemesterInstance, Semester };
