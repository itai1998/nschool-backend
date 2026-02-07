import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.js";

class AppleOrderItem extends Model {}

AppleOrderItem.init(
  {
    order_item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    order_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    unit_price: DataTypes.DECIMAL,
  },
  {
    sequelize,
    modelName: "AppleOrderItem",
    tableName: "order_items",
    timestamps: true,
    createdAt: "create_at",
    updatedAt: "update_at",
    freezeTableName: true,
  }
);

export default AppleOrderItem;
