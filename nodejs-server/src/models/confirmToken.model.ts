import db from "../configs/db.config";
import { DataTypes, Model } from "sequelize";
import { User } from "./user.model";
interface ConfirmTokenAttributes {
  id?: number;
  token: string;
  expiredTime: Date;
  userId: number;
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
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "user_id",
    },
  },
  {
    timestamps: false,
    tableName: "confirm_token",
  }
);

User.hasMany(ConfirmToken, { foreignKey: "userId" });
ConfirmToken.belongsTo(User, { foreignKey: "id" });

export { ConfirmTokenAttributes, ConfirmTokenInstance, ConfirmToken };
