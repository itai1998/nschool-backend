import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.js";

class AppleOrder extends Model {}

AppleOrder.init(
  {
    order_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    user_id: DataTypes.INTEGER,
    create_at: DataTypes.DATE,
    shipping_address: DataTypes.STRING,
    total_amount: DataTypes.DECIMAL,
  },
  {
    sequelize,
    modelName: "AppleOrder",
    tableName: "orders",
    timestamps: false,
    freezeTableName: true,
  }
);

export default AppleOrder;
