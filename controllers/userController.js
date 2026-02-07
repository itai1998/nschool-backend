import AppleUser from "../models/AppleUser.js";

export const getAllUsers = async (req, res) => {
  try {
    const allUsers = await AppleUser.findAll();
    res.json(allUsers);
  } catch (error) {
    console.error("GET /users error:", error);
    res.status(500).json({ message: error.message });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await AppleUser.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    console.error("GET /users/:id error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

export const createUser = async (req, res) => {
  try {
    const newUser = await AppleUser.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      create_at: new Date(),
      update_at: new Date(),
    });

    res.status(201).json(newUser);
  } catch (err) {
    console.error("POST /users error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

export const updateUser = async (req, res) => {
  try {
    const updatedUser = await AppleUser.findByPk(req.params.id);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    updatedUser.set({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      phone: req.body.phone,
      email: req.body.email,
      address: req.body.address,
      create_at: req.body.create_at,
      update_at: req.body.update_at,
    });

    await updatedUser.save();
    res.json(updatedUser);
  } catch (err) {
    console.error("PUT /users/:id error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const deletedUser = await AppleUser.destroy({
      where: {
        user_id: req.params.id,
      },
    });

    if (deletedUser === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Apple user deleted successfully" });
  } catch (err) {
    console.error("DELETE /users/:id error:", err);
    res.status(500).json({
      message: err.message,
      name: err.name,
      parent: err.parent?.message,
      sql: err.sql,
    });
  }
};
