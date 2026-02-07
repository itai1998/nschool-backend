import AppleOrder from "../models/AppleOrder.js";

export const getAllOrders = async (req, res) => {
  try {
    const allOrders = await AppleOrder.findAll();
    res.json(allOrders);
  } catch (error) {
    console.error("GET /orders error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await AppleOrder.findByPk(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    console.error("GET /orders/:id error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

export const createOrder = async (req, res) => {
  try {
    const newOrder = await AppleOrder.create({
      user_id: req.body.user_id,
      shipping_address: req.body.shipping_address,
      total_amount: req.body.total_amount,
    });

    res.status(201).json(newOrder);
  } catch (err) {
    console.error("POST /orders error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const updateOrder = await AppleOrder.findByPk(req.params.id);

    if (!updateOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    updateOrder.set({
      user_id: req.body.user_id,
      shipping_address: req.body.shipping_address,
      total_amount: req.body.total_amount,
    });

    await updateOrder.save();
    res.json(updateOrder);
  } catch (err) {
    console.error("PUT /orders/:id error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const deletedOrder = await AppleOrder.destroy({
      where: {
        order_id: req.params.id,
      },
    });

    if (deletedOrder === 0) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Apple order deleted successfully" });
  } catch (err) {
    console.error("DELETE /orders/:id error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};
