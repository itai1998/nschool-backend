import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.js";

class AppleUser extends Model {}

AppleUser.init(
  {
    user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "AppleUser",
    tableName: "users",
    timestamps: true,
    createdAt: "create_at",
    updatedAt: "update_at",
    freezeTableName: true,
  }
);

export default AppleUser;
