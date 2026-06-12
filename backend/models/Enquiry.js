import mongoose from "mongoose";

const enquirySchema = new mongoose.Schema(
  {
    name: String,
    phone: String,
    email: String,
    message: String,

    // REQUIRED for status update
    status: {
      type: String,
      default: "new",
      enum: ["new", "read", "replied"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Enquiry", enquirySchema);