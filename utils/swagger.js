import swaggerJsdoc from "swagger-jsdoc";

export const getSwaggerSpec = (port) => {
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
    apis: ["./routes/*.js"], // Path to the API files
  };

  return swaggerJsdoc(swaggerOptions);
};
