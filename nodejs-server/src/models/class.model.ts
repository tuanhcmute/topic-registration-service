import db from "configs/db.config";
import { DataTypes, Model } from "sequelize";

interface ClassAttributes {
  id: string;
  code: string;
  description?: string;
  createdBy?: string;
  createdDate?: Date;
  updatedDate?: Date;
}

interface ClassInstance extends Model<ClassAttributes>, ClassAttributes {}

const Class = db.define<ClassInstance>(
  "class",
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
    tableName: "Class",
  }
);

export { ClassInstance, ClassAttributes, Class };
