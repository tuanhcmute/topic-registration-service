import db from "configs/db.config";
import { DataTypes, Model } from "sequelize";

interface EnrollmentAttributes {
  id: string;
  topicId: string;
  studentId: string;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: string;
}

interface EnrollmentInstance
  extends Model<EnrollmentAttributes>,
    EnrollmentAttributes {}

const Enrollment = db.define<EnrollmentInstance>(
  "enrollment",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: "id",
    },
    topicId: {
      type: DataTypes.STRING,
      field: "topic_id",
    },
    studentId: {
      type: DataTypes.STRING,
      field: "student_id",
    },
    createdDate: {
      type: DataTypes.DATE,
      field: "created_date",
    },
    updatedDate: {
      type: DataTypes.DATE,
      field: "updated_date",
    },
    createdBy: {
      type: DataTypes.STRING,
      field: "created_by",
    },
  },
  {
    timestamps: false,
    tableName: "Enrollment",
  }
);

export { EnrollmentInstance, EnrollmentAttributes, Enrollment };
