import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";

import Admin from "./models/Admin.js";

dotenv.config();

await mongoose.connect(process.env.MONGO_URI);

const hashedPassword = await bcrypt.hash("Deepak@123", 10);

await Admin.create({
  email: "deepak@gmail.com",
  password: hashedPassword,
});

console.log("Admin Created");
process.exit();