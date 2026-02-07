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
    create_at: DataTypes.DATE,
    update_at: DataTypes.DATE,
  },
  {
    sequelize,
    modelName: "AppleUser",
    tableName: "users",
    timestamps: false,
    freezeTableName: true,
  }
);

export default AppleUser;
