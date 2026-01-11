import "dotenv/config";
import express from "express";
import sequelizePackage from "sequelize";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
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

// Swagger configuration
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Apple Store API",
      version: "1.0.0",
      description: "API documentation for Apple Store backend",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Development server",
      },
    ],
    components: {
      schemas: {
        Product: {
          type: "object",
          properties: {
            product_id: {
              type: "integer",
              description: "Product ID",
            },
            name: {
              type: "string",
              description: "Product name",
            },
            description: {
              type: "string",
              description: "Product description",
            },
            img_url: {
              type: "string",
              description: "Product image URL",
            },
            price: {
              type: "number",
              description: "Product price",
            },
            slug: {
              type: "string",
              description: "Product slug",
            },
          },
        },
      },
    },
    tags: [
      {
        name: "Products",
        description: "Apple products management endpoints",
      },
    ],
  },
  apis: ["./index.js"], // Path to the API files
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

/**
 * @swagger
 * /:
 *   post:
 *     summary: Create a new Apple product
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - img_url
 *               - price
 *               - slug
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               description:
 *                 type: string
 *                 description: Product description
 *               img_url:
 *                 type: string
 *                 description: Product image URL
 *               price:
 *                 type: number
 *                 description: Product price
 *               slug:
 *                 type: string
 *                 description: Product slug
 *     responses:
 *       201:
 *         description: Product created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /:
 *   get:
 *     summary: Get all Apple products
 *     tags: [Products]
 *     responses:
 *       200:
 *         description: List of all products
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       500:
 *         description: Server error
 */
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

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: Get a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product details
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
app.get("/:id", async (req, res) => {
  const appleProduct = await AppleProducts.findByPk(req.params.id);
  res.setHeader("Content-Type", "application/json");
  res.write(JSON.stringify(appleProduct));
  res.end();
});

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Delete a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     responses:
 *       200:
 *         description: Product deleted successfully
 *       404:
 *         description: Product not found
 */
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

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: Update a product by ID
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Product ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Product name
 *               description:
 *                 type: string
 *                 description: Product description
 *               img_url:
 *                 type: string
 *                 description: Product image URL
 *               price:
 *                 type: number
 *                 description: Product price
 *               slug:
 *                 type: string
 *                 description: Product slug
 *     responses:
 *       200:
 *         description: Product updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Product'
 *       404:
 *         description: Product not found
 */
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
