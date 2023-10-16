import db from "@configs/db.config";
import { DataTypes, Model } from "sequelize";

interface ApprovalHistoryAttributes {
  id: string;
  code: string;
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

const ApprovalHistory = db.define<ApprovalHistoryInstance>(
  "approvalHistory",
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
    reason: {
      type: DataTypes.STRING,
      field: "reason",
    },
    status: {
      type: DataTypes.STRING,
      field: "status",
    },
    topicId: {
      type: DataTypes.STRING,
      field: "topic_id",
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
    tableName: "ApprovalHistory",
  }
);

export { ApprovalHistoryAttributes, ApprovalHistoryInstance, ApprovalHistory };
