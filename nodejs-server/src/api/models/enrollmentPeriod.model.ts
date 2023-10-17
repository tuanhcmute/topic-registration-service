import db from "@configs/db.config";
import { DataTypes, Model } from "sequelize";
import { Topic } from "./topic.model";

interface EnrollmentPeriodAttributes {
  id: string;
  code: string;
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
  active: string;
  type?: string;
  period?: string;
  semesterId?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: string;
}

interface EnrollmentPeriodInstance
  extends Model<EnrollmentPeriodAttributes>,
    EnrollmentPeriodAttributes {}

const EnrollmentPeriod = db.define<EnrollmentPeriodInstance>(
  "enrollmentPeriod",
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
    startDate: {
      type: DataTypes.DATE,
      field: "start_date",
    },
    endDate: {
      type: DataTypes.DATE,
      field: "end_date",
    },
    active: {
      type: DataTypes.STRING,
      field: "active",
    },
    type: {
      type: DataTypes.STRING,
      field: "type",
    },
    period: {
      type: DataTypes.STRING,
      field: "period",
    },
    semesterId: {
      type: DataTypes.STRING,
      field: "semester_id",
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
    tableName: "EnrollmentPeriod",
  }
);

EnrollmentPeriod.hasMany(Topic, {
  as: "EnrollmentPeriod",
  foreignKey: "periodId",
});
Topic.belongsTo(EnrollmentPeriod, {
  foreignKey: "code",
  as: "enrollmentPeriod",
});

export {
  EnrollmentPeriodAttributes,
  EnrollmentPeriodInstance,
  EnrollmentPeriod,
};
