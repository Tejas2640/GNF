import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// CREATE
export const createProduct = async (req, res) => {
  try {
    const images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

        const upload = await cloudinary.uploader.upload(base64, {
          folder: "gate-products",
        });

        images.push({
          url: upload.secure_url,
          public_id: upload.public_id,
        });
      }
    }

    const product = await Product.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description,
      category: req.body.category,
      images,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL (IMPORTANT FIX)
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      products,   // 🔥 ALWAYS ARRAY INSIDE KEY
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

// DELETE
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Not found" });
    }

    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();

    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};