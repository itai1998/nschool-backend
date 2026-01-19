import "dotenv/config";
import express from "express";
import swaggerUi from "swagger-ui-express";
import { connectDatabase } from "./utils/database.js";
import { getSwaggerSpec } from "./utils/swagger.js";
import AppleProducts from "./models/AppleProduct.js";
import routes from "./routes/index.js";

// Initialize Express app
const app = express();
app.use(express.json());

const port = parseInt(process.env.PORT) || 3000;

// Connect to database
await connectDatabase();

// Sync models
AppleProducts.sync();

// Swagger setup
const swaggerSpec = getSwaggerSpec(port);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use("/", routes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
