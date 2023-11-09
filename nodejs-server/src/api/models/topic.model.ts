import { DataTypes, Model } from "sequelize";
import db from "../configs/db.config";
import { User, UserInstance } from "./user.model";
import { POSTFIX } from "@configs/constants";
import { Semester } from "./semester.model";
import { Major } from "./major.model";

interface TopicAttributes {
  id?: string;
  code: string;
  name: string;
  type?: string;
  goal?: string;
  requirement?: string;
  status?: string;
  maxSlot?: number;
  availableSlot?: number;
  createdBy?: string;
  createdDate?: string;
  updatedDate?: string;
  semesterId?: string;
  lectureId?: string;
  majorId: string;
}

interface TopicInstance extends Model<TopicAttributes>, TopicAttributes {
  students?: UserInstance[];
}

const modelName: string = "topic";
const Topic = db.define<TopicInstance>(
  modelName,
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "id".concat(POSTFIX),
      defaultValue: DataTypes.UUIDV4,
    },
    code: {
      type: DataTypes.STRING,
      field: "code",
    },
    name: {
      type: DataTypes.STRING,
      field: "name".concat(POSTFIX),
    },
    type: {
      type: DataTypes.STRING,
      field: "type".concat(POSTFIX),
    },
    goal: {
      type: DataTypes.BLOB("long"),
      field: "goal".concat(POSTFIX),
      get() {
        return this.getDataValue("goal")?.toString();
      },
    },
    requirement: {
      type: DataTypes.BLOB("long"),
      field: "requirement".concat(POSTFIX),
      get() {
        return this.getDataValue("requirement")?.toString();
      },
    },
    status: {
      type: DataTypes.STRING,
      field: "status".concat(POSTFIX),
    },
    maxSlot: {
      type: DataTypes.INTEGER,
      field: "max_slot".concat(POSTFIX),
    },
    availableSlot: {
      type: DataTypes.INTEGER,
      field: "available_slot".concat(POSTFIX),
    },
    createdBy: {
      type: DataTypes.STRING,
      field: "created_by".concat(POSTFIX),
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
    semesterId: {
      type: DataTypes.UUID,
      field: "semester_id".concat(POSTFIX),
    },
    lectureId: {
      type: DataTypes.UUID,
      field: "lecture_id".concat(POSTFIX),
    },
    majorId: {
      type: DataTypes.UUID,
      field: "major_id".concat(POSTFIX),
    },
  },
  {
    timestamps: false,
    tableName: "topic_tbl",
  }
);

Semester.hasMany(Topic, { foreignKey: "semesterId", as: "topics" });
Topic.belongsTo(Semester, { as: "semester" });

User.hasMany(Topic, { foreignKey: "lectureId", as: "topics" });
Topic.belongsTo(User, { as: "lecture" });

Major.hasMany(Topic, { foreignKey: "majorId", as: "topics" });
Topic.belongsTo(Major, { as: "major" });
export { Topic, TopicAttributes, TopicInstance };
