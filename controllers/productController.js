import AppleProducts from "../models/AppleProduct.js";

/**
 * Get all products
 */
export const getAllProducts = async (req, res) => {
  try {
    const allAppleProducts = await AppleProducts.findAll();
    res.json(allAppleProducts);
  } catch (err) {
    console.error("GET / error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

/**
 * Get a product by ID
 */
export const getProductById = async (req, res) => {
  try {
    const appleProduct = await AppleProducts.findByPk(req.params.id);

    if (!appleProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(appleProduct);
  } catch (err) {
    console.error("GET /:id error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

/**
 * Create a new product
 */
export const createProduct = async (req, res) => {
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
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

/**
 * Update a product by ID
 */
export const updateProduct = async (req, res) => {
  try {
    const updateAppleProduct = await AppleProducts.findByPk(req.params.id);

    if (!updateAppleProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    updateAppleProduct.set({
      name: req.body.name,
      description: req.body.description,
      img_url: req.body.img_url,
      price: req.body.price,
      slug: req.body.slug,
    });

    await updateAppleProduct.save();
    res.json(updateAppleProduct);
  } catch (err) {
    console.error("PUT /:id error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

/**
 * Delete a product by ID
 */
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await AppleProducts.destroy({
      where: {
        product_id: req.params.id,
      },
    });

    if (deletedProduct === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json({ message: "Apple product deleted successfully" });
  } catch (err) {
    console.error("DELETE /:id error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};
