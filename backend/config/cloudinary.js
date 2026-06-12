import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";

console.log("CLOUDINARY_NAME =", process.env.CLOUDINARY_NAME);
console.log("CLOUDINARY_API_KEY =", process.env.CLOUDINARY_API_KEY);
console.log(
  "CLOUDINARY_API_SECRET =",
  process.env.CLOUDINARY_API_SECRET ? "FOUND" : "UNDEFINED"
);

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export default cloudinary;