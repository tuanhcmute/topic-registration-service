import db from "configs/db.config";
import { DataTypes, Model } from "sequelize";

interface DivisionAttributes {
  id: string;
  name?: string;
  status?: string;
  position?: string;
  startDate?: Date;
  detailedTime?: Date;
  topicId: string;
  lectureId: string;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}

interface DivisionInstance
  extends Model<DivisionAttributes>,
    DivisionAttributes {}

const Division = db.define<DivisionInstance>(
  "division",
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      field: "id",
    },
    name: {
      type: DataTypes.STRING,
      field: "name",
    },
    status: {
      type: DataTypes.STRING,
      field: "status",
    },
    position: {
      type: DataTypes.STRING,
      field: "position",
    },
    startDate: {
      type: DataTypes.DATE,
      field: "start_date",
    },
    detailedTime: {
      type: DataTypes.DATE,
      field: "detailed_time",
    },
    topicId: {
      type: DataTypes.STRING,
      field: "topic_id",
    },
    lectureId: {
      type: DataTypes.STRING,
      field: "lecture_id",
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
    tableName: "Division",
  }
);
