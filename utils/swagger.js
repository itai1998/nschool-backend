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
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "Enter JWT token",
          },
        },
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
          Order: {
            type: "object",
            properties: {
              order_id: {
                type: "integer",
                description: "Order ID",
              },
              user_id: {
                type: "integer",
                description: "User ID",
              },
              create_at: {
                type: "string",
                format: "date-time",
                description: "Order creation date",
              },
              update_at: {
                type: "string",
                format: "date-time",
                description: "Order update date",
              },
              shipping_address: {
                type: "string",
                description: "Shipping address",
              },
              total_amount: {
                type: "number",
                format: "decimal",
                description: "Total order amount",
              },
            },
          },
          OrderItem: {
            type: "object",
            properties: {
              order_item_id: {
                type: "integer",
                description: "Order item ID",
              },
              order_id: {
                type: "integer",
                description: "Order ID",
              },
              product_id: {
                type: "integer",
                description: "Product ID",
              },
              quantity: {
                type: "integer",
                description: "Quantity of the product",
              },
              unit_price: {
                type: "number",
                format: "decimal",
                description: "Unit price of the product",
              },
              create_at: {
                type: "string",
                format: "date-time",
                description: "Order item creation date",
              },
              update_at: {
                type: "string",
                format: "date-time",
                description: "Order item update date",
              },
            },
          },
          User: {
            type: "object",
            properties: {
              user_id: {
                type: "integer",
                description: "User ID",
              },
              first_name: {
                type: "string",
                description: "User's first name",
              },
              last_name: {
                type: "string",
                description: "User's last name",
              },
              phone: {
                type: "string",
                description: "User's phone number",
              },
              email: {
                type: "string",
                description: "User's email address",
              },
              address: {
                type: "string",
                description: "User's address",
              },
              create_at: {
                type: "string",
                format: "date-time",
                description: "User creation date",
              },
              update_at: {
                type: "string",
                format: "date-time",
                description: "User update date",
              },
            },
          },
          LoginRequest: {
            type: "object",
            required: ["username"],
            properties: {
              username: {
                type: "string",
                description: "Username for login",
                example: "username",
              },
              password: {
                type: "string",
                description: "Password for login",
                example: "password",
              },
            },
          },
          LoginResponse: {
            type: "object",
            properties: {
              accessToken: {
                type: "string",
                description: "JWT access token",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
            },
          },
          RefreshTokenRequest: {
            type: "object",
            required: ["token"],
            properties: {
              token: {
                type: "string",
                description: "Refresh token to generate new access token",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
            },
          },
          RefreshTokenResponse: {
            type: "object",
            properties: {
              accessToken: {
                type: "string",
                description: "New JWT access token",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
              },
            },
          },
          LogoutRequest: {
            type: "object",
            required: ["token"],
            properties: {
              token: {
                type: "string",
                description: "Refresh token to remove from valid tokens",
                example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
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
        {
          name: "Auth",
          description: "Authentication endpoints",
        },
        {
          name: "Orders",
          description: "Apple orders management endpoints",
        },
        {
          name: "OrderItems",
          description: "Apple order items management endpoints",
        },
        {
          name: "Users",
          description: "Apple users management endpoints",
        },
      ],
    },
    apis: ["./routes/*.js"], // Path to the API files
  };

  return swaggerJsdoc(swaggerOptions);
};
