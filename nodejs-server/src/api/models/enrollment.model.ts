import db from "@configs/db.config";
import { DataTypes, Model } from "sequelize";
import { User, Topic } from "@models";

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

// Define the many-to-many relationship between User and Topic through Enrollment
User.belongsToMany(Topic, {
  through: Enrollment,
  foreignKey: "studentId", // The foreign key in the Enrollment table that links to User
  otherKey: "topicId", // The foreign key in the Enrollment table that links to Topic
});

Topic.belongsToMany(User, {
  through: Enrollment,
  foreignKey: "topicId", // The foreign key in the Enrollment table that links to Topic
  otherKey: "studentId", // The foreign key in the Enrollment table that links to User
});

// // Optionally, you can add additional metadata to the association
// Enrollment.belongsTo(User, { foreignKey: "studentId" });
// Enrollment.belongsTo(Topic, { foreignKey: "topicId" });

export { EnrollmentInstance, EnrollmentAttributes, Enrollment };
