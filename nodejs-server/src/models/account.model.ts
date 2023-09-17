import { DataTypes, Model } from "sequelize";
import db from "../configs/db.config";
import { User } from "./user.model";

interface AccountAttributes {
  id?: number;
  userId?: number;
  username: string;
  password: string;
  role: string;
  enable?: boolean;
}

interface AccountInstance extends Model<AccountAttributes>, AccountAttributes {}

const Account = db.define<AccountInstance>(
  "account",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
      field: "id",
    },
    userId: {
      type: DataTypes.INTEGER,
      field: "user_id",
    },
    username: {
      type: DataTypes.STRING,
      field: "username",
    },
    password: {
      type: DataTypes.STRING,
      field: "password",
    },
    role: {
      type: DataTypes.STRING,
      field: "roles",
    },
    enable: {
      type: DataTypes.BOOLEAN,
      field: "enable",
    },
  },
  {
    timestamps: false,
    tableName: "accounts",
  }
);

// Account.hasOne(User, { foreignKey: "userId" });
// User.belongsTo(Account, { foreignKey: "userId" });

export { Account, AccountAttributes, AccountInstance };
