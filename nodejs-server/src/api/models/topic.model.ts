import db from "../configs/db.config";
import { DataTypes, Model } from "sequelize";

interface TopicAttributes {
  id: string;
  code: string;
  name: string;
  type?: string;
  goal?: string;
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
}

interface TopicInstance extends Model<TopicAttributes>, TopicAttributes {}

const Topic = db.define<TopicInstance>(
  "topic",
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
      field: "lecturer_id",
    },
    specializationId: {
      type: DataTypes.STRING,
      field: "specialization",
    },
  },
  {
    timestamps: false,
    tableName: "Topic",
  }
);

export { Topic, TopicAttributes, TopicInstance };
