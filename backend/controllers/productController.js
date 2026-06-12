import Product from "../models/Product.js";
import cloudinary from "../config/cloudinary.js";

// CREATE PRODUCT (WITH CLOUDINARY UPLOAD)
export const createProduct = async (req, res) => {
  try {
    const images = [];

    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const base64 = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

        const uploadResult = await cloudinary.uploader.upload(base64, {
          folder: "gate-products",
        });

        images.push({
          url: uploadResult.secure_url,
          public_id: uploadResult.public_id,
        });
      }
    }

    const product = await Product.create({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      images,
    });

    res.status(201).json(product);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE PRODUCT
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // delete images from cloudinary
    for (const img of product.images) {
      await cloudinary.uploader.destroy(img.public_id);
    }

    await product.deleteOne();

    res.json({ message: "Product deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};