import "dotenv/config";
import express from "express";
import sequelizePackage from "sequelize";
const { DataTypes, Model, Sequelize } = sequelizePackage;

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT) || 5432,
    dialect: "postgres",
  }
);

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

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
    timestamps: false, // ✅ THIS fixes createdAt/updatedAt issue
    freezeTableName: true,
  }
);

AppleProducts.sync();

const app = express();
app.use(express.json());
const port = parseInt(process.env.PORT) || 3000;

app.post("/", async (req, res) => {
  try {
    const newAppleProduct = await AppleProducts.create({
      name: req.body.name,
      description: req.body.description,
      img_url: req.body.img_url,
      price: req.body.price,
      slug: req.body.slug,
    });

    res.status(201).json(newAppleProduct);
  } catch (err) {
    console.error("POST / error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message, // <-- real Postgres error
      sql: err.sql,
    });
  }
});

app.get("/", async (req, res) => {
  try {
    const allAppleProducts = await AppleProducts.findAll();
    res.json(allAppleProducts);
  } catch (err) {
    console.error("GET / error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message, // <-- Postgres error text
      sql: err.sql, // <-- SQL that failed
    });
  }
});

app.get("/:id", async (req, res) => {
  const appleProduct = await AppleProducts.findByPk(req.params.id);
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(appleProduct));
  res.end();
});

app.delete("/:id", async (req, res) => {
  await AppleProducts.destroy({
    where: {
      product_id: req.params.id,
    },
  });
  res.setHeader("Content-Type", "application/json");
  res.write("Apple product deleted successfully");
  res.end();
});

app.put("/:id", async (req, res) => {
  const updateAppleProduct = await AppleProducts.findByPk(req.params.id);
  updateAppleProduct.set({
    name: req.body.name,
    description: req.body.description,
    img_url: req.body.img_url,
    price: req.body.price,
    slug: req.body.slug,
  });
  await updateAppleProduct.save();
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(updateAppleProduct));
  res.end();
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
