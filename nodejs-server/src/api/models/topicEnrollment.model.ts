import { DataTypes, Model } from "sequelize";
import db from "@configs/db.config";
import { User, Topic, UserInstance, TopicInstance } from "@models";
import { POSTFIX } from "@configs/constants";
import { topicEnrollmentController } from "@controllers";
import _ from "lodash";
import { ValidateFailException } from "@exceptions";
import { logger } from "@configs";

interface TopicEnrollmentAttributes {
  id?: string;
  topicId?: string;
  studentId?: string;
  createdDate?: Date;
  updatedDate?: Date;
  createdBy?: string;
  isLeader?: boolean;
}

interface TopicEnrollmentInstance extends Model<TopicEnrollmentAttributes>, TopicEnrollmentAttributes {
  student?: UserInstance;
  topic?: TopicInstance;
}

const modelName: string = "topicEnrollment";
const TopicEnrollment = db.define<TopicEnrollmentInstance>(
  modelName,
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "id".concat(POSTFIX),
      defaultValue: DataTypes.UUIDV4
    },
    topicId: {
      type: DataTypes.UUID,
      field: "topic_id".concat(POSTFIX)
    },
    studentId: {
      type: DataTypes.UUID,
      field: "student_id".concat(POSTFIX)
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
    },
    createdBy: {
      type: DataTypes.STRING,
      field: "created_by".concat(POSTFIX)
    },
    isLeader: {
      type: DataTypes.BOOLEAN,
      field: "is_leader".concat(POSTFIX)
    }
  },
  {
    timestamps: false,
    tableName: "topic_enrollment_tbl"
  }
);

// Update topic availabel slot
TopicEnrollment.addHook("afterCreate", async (topicEnrollment, options) => {
  const topic = await Topic.findByPk(topicEnrollment.dataValues.topicId);
  if (_.isNull(topic)) throw new ValidateFailException("Topic could not be found");
  if (topic.availableSlot) topic.availableSlot = topic.availableSlot - 1;
  await topic.save();
});
TopicEnrollment.addHook("afterDestroy", async (topicEnrollment, options) => {
  const topic = await Topic.findByPk(topicEnrollment.dataValues.topicId);
  if (_.isNull(topic)) throw new ValidateFailException("Topic could not be found");
  if (!_.isUndefined(topic.availableSlot)) {
    const availableSlot = topic.availableSlot;
    topic.availableSlot = availableSlot + 1;
  }
  await topic.save();
  logger.info("Topic enrollment updated availableSlot column");
});

// Check leader
TopicEnrollment.addHook("afterCreate", async (topicEnrollment, options) => {
  const topicEnrollments = await TopicEnrollment.findAll({
    where: { topicId: topicEnrollment.dataValues.topicId }
  });
  const isAllMatch = topicEnrollments.every((item) =>
    _.isEqual(item.dataValues.studentId, topicEnrollment.dataValues.studentId)
  );
  if (isAllMatch) topicEnrollment.setDataValue("isLeader", true);
  else topicEnrollment.setAttributes("isLeader", false);
  await topicEnrollment.save();
  logger.info("Topic enrollment updated leader column");
});
TopicEnrollment.addHook("afterDestroy", async (topicEnrollment, options) => {
  if (topicEnrollment.dataValues.isLeader) {
    const topicEnrollmentInDb = await TopicEnrollment.findOne({
      where: { topicId: topicEnrollment.dataValues.topicId }
    });
    if (!_.isNull(topicEnrollmentInDb)) {
      topicEnrollmentInDb.setDataValue("isLeader", true);
      await topicEnrollmentInDb.save();
      logger.info("Topic enrollment updated leader column");
    }
  }
});

Topic.hasMany(TopicEnrollment, {
  foreignKey: "topicId",
  as: "topicEnrollments"
});
TopicEnrollment.belongsTo(Topic, { as: "topic" });

User.hasMany(TopicEnrollment, {
  foreignKey: "studentId",
  as: "topicEnrollments"
});
TopicEnrollment.belongsTo(User, { as: "student" });

export { TopicEnrollmentInstance, TopicEnrollmentAttributes, TopicEnrollment };
