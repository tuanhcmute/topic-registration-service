import db from "configs/db.config";
import { DataTypes, Model } from "sequelize";

interface SpecializationAttributes {
  id: string;
  code: string;
  description?: string;
  name: string;
}

interface SpecializationInstance
  extends Model<SpecializationAttributes>,
    SpecializationAttributes {}

const Specialization = db.define<SpecializationInstance>(
  "Specialization",
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
    description: {
      type: DataTypes.STRING,
      field: "description",
    },
    name: {
      type: DataTypes.STRING,
      field: "name",
    },
  },
  {
    timestamps: false,
    tableName: "Specialization",
  }
);

export { SpecializationInstance, SpecializationAttributes, Specialization };
