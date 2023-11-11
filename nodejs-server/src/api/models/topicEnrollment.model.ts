import { DataTypes, Model } from "sequelize";
import db from "@configs/db.config";
import { User, Topic } from "@models";
import { POSTFIX } from "@configs/constants";

interface TopicEnrollmentAttributes {
  id?: string;
  topicId?: string;
  studentId?: string;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: string;
}

interface TopicEnrollmentInstance
  extends Model<TopicEnrollmentAttributes>,
    TopicEnrollmentAttributes {}

const modelName: string = "topicEnrollment";
const TopicEnrollment = db.define<TopicEnrollmentInstance>(
  modelName,
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "id".concat(POSTFIX),
      defaultValue: DataTypes.UUIDV4,
    },
    topicId: {
      type: DataTypes.UUID,
      field: "topic_id".concat(POSTFIX),
    },
    studentId: {
      type: DataTypes.UUID,
      field: "student_id".concat(POSTFIX),
    },
    createdDate: {
      type: DataTypes.DATE,
      field: "created_date".concat(POSTFIX),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedDate: {
      type: DataTypes.DATE,
      field: "updated_date".concat(POSTFIX),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      type: DataTypes.STRING,
      field: "created_by".concat(POSTFIX),
    },
  },
  {
    timestamps: false,
    tableName: "topic_enrollment_tbl",
  }
);

Topic.hasMany(TopicEnrollment, {
  foreignKey: "topicId",
  as: "topicEnrollments",
});
TopicEnrollment.belongsTo(Topic, { as: "topic" });

User.hasMany(TopicEnrollment, {
  foreignKey: "studentId",
  as: "topicEnrollments",
});
TopicEnrollment.belongsTo(User, { as: "student" });

export { TopicEnrollmentInstance, TopicEnrollmentAttributes, TopicEnrollment };
