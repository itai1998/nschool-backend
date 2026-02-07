import AppleOrderItem from "../models/AppleOrderItem.js";

export const getAllOrderItems = async (req, res) => {
  try {
    const allOrderItems = await AppleOrderItem.findAll();
    res.json(allOrderItems);
  } catch (error) {
    console.error("GET /orderItems error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getAllOrderItem = async (req, res) => {
  try {
    const orderItem = await AppleOrderItem.findByPk(req.params.id);

    if (!orderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.json(orderItem);
  } catch (err) {
    console.error("GET /orderItems/:id error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

export const createOrderItem = async (req, res) => {
  try {
    const orderItem = await AppleOrderItem.create({
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      unit_price: req.body.unit_price,
    });

    res.status(201).json(orderItem);
  } catch (err) {
    console.error("POST /orderItems error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

export const updateOrderItem = async (req, res) => {
  try {
    const updatedOrderItem = await AppleOrderItem.findByPk(req.params.id);

    if (!updatedOrderItem) {
      return res.status(404).json({ message: "Order item not found" });
    }

    updatedOrderItem.set({
      order_id: req.body.order_id,
      product_id: req.body.product_id,
      quantity: req.body.quantity,
      unit_price: req.body.unit_price,
    });

    await updatedOrderItem.save();
    res.json(updatedOrderItem);
  } catch (err) {
    console.error("PUT /orderItems/:id error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

export const deleteOrderItem = async (req, res) => {
  try {
    const deletedOrderItem = await AppleOrderItem.destroy({
      where: {
        order_item_id: req.params.id,
      },
    });

    if (deletedOrderItem === 0) {
      return res.status(404).json({ message: "Order item not found" });
    }

    res.json({ message: "Order item deleted successfully" });
  } catch (err) {
    console.error("DELETE /orderItems/:id error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};
