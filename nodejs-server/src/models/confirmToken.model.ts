import db from "../configs/db.config";
import { DataTypes, Model } from "sequelize";
import { Account } from "./account.model";
interface ConfirmTokenAttributes {
  id?: number;
  token: string;
  expiredTime: Date;
  accountId?: number;
}

interface ConfirmTokenInstance
  extends Model<ConfirmTokenAttributes>,
    ConfirmTokenAttributes {}

const ConfirmToken = db.define<ConfirmTokenInstance>(
  "confirmToken",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      field: "id",
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "token",
    },
    expiredTime: {
      type: DataTypes.DATE,
      allowNull: false,
      field: "expired_time",
    },
    accountId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "account_id",
    },
  },
  {
    timestamps: false,
    tableName: "confirm_token",
  }
);

Account.hasMany(ConfirmToken, { foreignKey: "id" });
ConfirmToken.belongsTo(Account, { foreignKey: "accountId" });

export { ConfirmTokenAttributes, ConfirmTokenInstance, ConfirmToken };
