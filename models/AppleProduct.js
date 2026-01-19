import { DataTypes, Model } from "sequelize";
import sequelize from "../utils/database.js";

class AppleProducts extends Model {}

AppleProducts.init(
  {
    product_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    img_url: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    slug: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "AppleProducts",
    tableName: "products",
    timestamps: false,
    freezeTableName: true,
  }
);

export default AppleProducts;
