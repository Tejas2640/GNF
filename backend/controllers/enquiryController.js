import Enquiry from "../models/Enquiry.js";

// CREATE ENQUIRY (PUBLIC)
export const createEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.create(req.body);
    res.status(201).json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET ALL ENQUIRIES (ADMIN)
export const getEnquiries = async (req, res) => {
  try {
    const data = await Enquiry.find().sort({ createdAt: -1 });
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// DELETE ENQUIRY (ADMIN)
export const deleteEnquiry = async (req, res) => {
  try {
    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    await enquiry.deleteOne();

    res.json({ message: "Enquiry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE STATUS (ADMIN)
export const updateEnquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const enquiry = await Enquiry.findById(req.params.id);

    if (!enquiry) {
      return res.status(404).json({ message: "Enquiry not found" });
    }

    enquiry.status = status;
    await enquiry.save();

    res.json(enquiry);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};