import { DataTypes, Model } from "sequelize";

import { POSTFIX } from "@configs/constants";
import db from "@configs/db.config";
import { Topic } from "./topic.model";

interface ApprovalHistoryAttributes {
  id?: string;
  reason?: string;
  status?: string;
  topicId: string;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}

interface ApprovalHistoryInstance
  extends Model<ApprovalHistoryAttributes>,
    ApprovalHistoryAttributes {}

const modelName: string = "approvalHistory";
const ApprovalHistory = db.define<ApprovalHistoryInstance>(
  modelName,
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      field: "id".concat(POSTFIX),
      defaultValue: DataTypes.UUIDV4,
    },
    reason: {
      type: DataTypes.BLOB("long"),
      field: "reason".concat(POSTFIX),
    },
    status: {
      type: DataTypes.STRING,
      field: "status".concat(POSTFIX),
    },
    topicId: {
      type: DataTypes.UUID,
      field: "topic_id".concat(POSTFIX),
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
    tableName: "approval_history_tbl",
  }
);

Topic.hasMany(ApprovalHistory, {
  foreignKey: "topicId",
  as: "approvalHistories",
});
ApprovalHistory.belongsTo(Topic, { as: "topic" });

export { ApprovalHistoryAttributes, ApprovalHistoryInstance, ApprovalHistory };
