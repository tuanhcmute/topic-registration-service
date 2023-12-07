import { DataTypes, Model } from "sequelize";
import { POSTFIX } from "@configs/constants";
import db from "@configs/db.config";
import { Semester } from "./semester.model";

interface EnrollmentPeriodAttributes {
  id?: string;
  code?: string;
  name?: string;
  startDate?: Date;
  endDate?: Date;
  status?: string;
  type?: string;
  semesterId?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: string;
}

interface EnrollmentPeriodInstance extends Model<EnrollmentPeriodAttributes>, EnrollmentPeriodAttributes {}

const modelName: string = "enrollmentPeriod";
const EnrollmentPeriod = db.define<EnrollmentPeriodInstance>(
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
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      field: "name".concat(POSTFIX),
      allowNull: false
    },
    startDate: {
      type: DataTypes.DATEONLY,
      field: "start_date".concat(POSTFIX),
      allowNull: false,
      unique: true
    },
    endDate: {
      type: DataTypes.DATEONLY,
      field: "end_date".concat(POSTFIX),
      allowNull: false
    },
    status: {
      type: DataTypes.STRING,
      field: "status".concat(POSTFIX),
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      field: "type".concat(POSTFIX),
      allowNull: false
    },
    semesterId: {
      type: DataTypes.UUID,
      field: "semester_id".concat(POSTFIX)
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
    tableName: "enrollment_period_tbl"
  }
);

Semester.hasMany(EnrollmentPeriod, {
  foreignKey: "semesterId",
  as: "enrollmentPeriods"
});
EnrollmentPeriod.belongsTo(Semester, {
  as: "semester"
});

export { EnrollmentPeriodAttributes, EnrollmentPeriodInstance, EnrollmentPeriod };
