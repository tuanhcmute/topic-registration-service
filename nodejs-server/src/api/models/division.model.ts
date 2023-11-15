import { DataTypes, Model } from "sequelize";
import { POSTFIX } from "@configs/constants";
import db from "@configs/db.config";
import { Topic } from "./topic.model";
import { User } from "./user.model";

interface DivisionAttributes {
  id?: string;
  place?: string;
  startDate?: Date;
  specifiedTime?: string;
  topicId?: string;
  lectureId?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}

interface DivisionInstance
  extends Model<DivisionAttributes>,
    DivisionAttributes {}

const modelName: string = "division";
const Division = db.define<DivisionInstance>(
  modelName,
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "id".concat(POSTFIX),
      defaultValue: DataTypes.UUIDV4,
    },
    place: {
      type: DataTypes.STRING,
      field: "place",
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATEONLY,
      field: "start_date".concat(POSTFIX),
      allowNull: false,
    },
    specifiedTime: {
      type: DataTypes.STRING,
      field: "specified_time".concat(POSTFIX),
      allowNull: false,
    },
    topicId: {
      type: DataTypes.UUID,
      field: "topic_id".concat(POSTFIX),
    },
    lectureId: {
      type: DataTypes.UUID,
      field: "lecture_id".concat(POSTFIX),
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
  },
  {
    timestamps: false,
    tableName: "division_tbl",
  }
);

User.hasMany(Division, { foreignKey: "lectureId", as: "divisions" });
Division.belongsTo(User, { as: "lecture" });

Topic.hasMany(Division, { foreignKey: "topicId", as: "divisions" });
Division.belongsTo(Topic, { as: "topic" });

export { Division, DivisionInstance, DivisionAttributes };
