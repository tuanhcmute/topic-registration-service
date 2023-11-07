import db from "../configs/db.config";
import { DataTypes, Model, Sequelize } from "sequelize";
import { User, UserInstance } from "./user.model";

interface TopicAttributes {
  id?: string;
  ntid: string;
  name: string;
  type?: string;
  goal?: string;
  majorCode?: string;
  expectation?: string;
  requirement?: string;
  status?: string;
  maxSlot?: number;
  restSlot?: number;
  createdBy?: string;
  createdDate?: string;
  updatedDate?: string;
  semesterId?: string;
  specializationId?: string;
  lecturerId?: string;
  periodId?: string;
}

interface TopicInstance extends Model<TopicAttributes>, TopicAttributes {
  students?: UserInstance[];
}

const Topic = db.define<TopicInstance>(
  "topic",
  {
    id: {
      type: DataTypes.UUID, // Use UUIDV4 as the default value
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    ntid: {
      type: DataTypes.STRING,
      field: "code",
    },
    majorCode: {
      type: DataTypes.STRING,
      field: "marjorCode",
    },
    name: {
      type: DataTypes.STRING,
      field: "name",
    },
    type: {
      type: DataTypes.STRING,
      field: "type",
    },
    goal: {
      type: DataTypes.STRING,
      field: "goal",
    },
    expectation: {
      type: DataTypes.STRING,
      field: "expectation",
    },
    requirement: {
      type: DataTypes.STRING,
      field: "requirement",
    },
    status: {
      type: DataTypes.STRING,
      field: "status",
    },
    maxSlot: {
      type: DataTypes.INTEGER,
      field: "max_slot",
    },
    restSlot: {
      type: DataTypes.INTEGER,
      field: "rest_slot",
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
    semesterId: {
      type: DataTypes.STRING,
      field: "semester_id",
    },
    lecturerId: {
      type: DataTypes.STRING,
      field: "lecture_id",
    },
    specializationId: {
      type: DataTypes.STRING,
      field: "specialization_id",
    },
    periodId: {
      type: DataTypes.STRING,
      field: "enrollment_period_id",
    },
  },
  {
    timestamps: false,
    tableName: "Topic",
  }
);

User.hasMany(Topic, { foreignKey: "lecturerId" });
Topic.belongsTo(User, { foreignKey: "id" });

export { Topic, TopicAttributes, TopicInstance };
