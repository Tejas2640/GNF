import { useState } from "react";
import api from "../api/axios";
import { motion } from "framer-motion";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import toast from "react-hot-toast";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  // WhatsApp popup state
  const [openWA, setOpenWA] = useState(false);

  // WhatsApp numbers list
  const whatsappNumbers = [
    { name: "Deepak", number: "917527977195" },
    { name: "Davinder", number: "919592070410" },
  ];

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const loading = toast.loading("Sending enquiry...");

    try {
      await api.post("/enquiries", formData);

      toast.success("Enquiry sent successfully!", {
        id: loading,
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error("Something went wrong", {
        id: loading,
      });
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 overflow-hidden">

      {/* Background glow */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 h-72 w-72 bg-yellow-400/20 blur-3xl rounded-full animate-pulse" />
        <div className="absolute bottom-20 right-10 h-96 w-96 bg-orange-400/20 blur-3xl rounded-full animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-6 py-10">

        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-14"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-slate-900">
            Contact <span className="text-yellow-500">Us</span>
          </h1>
          <p className="text-slate-500 mt-4">
            We’re here to help you with custom gate solutions
          </p>
        </motion.div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* FORM */}
          <motion.form
            onSubmit={submitHandler}
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-white/70 backdrop-blur-xl border border-slate-200 shadow-xl rounded-3xl p-8"
          >
            <h2 className="text-2xl font-bold mb-6 text-slate-900">
              Send Enquiry
            </h2>

            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mb-4"
            />

            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mb-4"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mb-4"
            />

            <textarea
              rows="5"
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl mb-6"
            />

            <button className="w-full bg-black hover:bg-yellow-500 hover:text-black text-white py-3 rounded-xl font-semibold transition">
              Send Enquiry
            </button>
          </motion.form>

          {/* INFO */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >

            {/* ADDRESS */}
            <div className="bg-white/70 backdrop-blur-xl border rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-4">Our Address</h2>
              <div className="flex gap-3 text-slate-600">
                <MapPin className="text-yellow-500 mt-1" />
                <p>
                  Guru Nanak Fabrications,<br />
                  Nalas Road, Rajpura, Punjab , India
                </p>
              </div>
            </div>

            {/* CONTACT */}
            <div className="bg-white/70 backdrop-blur-xl border rounded-3xl p-6">
              <h2 className="text-xl font-bold mb-4">Contact Info</h2>

              <div className="space-y-3 text-slate-600">
                <div className="flex items-center gap-3">
                  <Phone className="text-yellow-500" />
                  <span>+91 9592070410</span>
                  <span>+91 7527977195</span>
                </div>

              </div>
            </div>

            {/* WHATSAPP BUTTON */}
            <div>
              <button
                onClick={() => setOpenWA(true)}
                className="flex items-center justify-center gap-3 bg-green-500 hover:bg-green-600 text-white py-4 rounded-2xl font-semibold w-full"
              >
                <MessageCircle />
                Chat on WhatsApp
              </button>

              {/* POPUP */}
              {openWA && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-2xl w-80 shadow-xl">

                    <h2 className="text-lg font-bold mb-4 text-center">
                      Select WhatsApp Number
                    </h2>

                    <div className="flex flex-col gap-3">
                      {whatsappNumbers.map((item, i) => (
                        <a
                          key={i}
                          href={`https://wa.me/${item.number}`}
                          target="_blank"
                          className="bg-green-500 hover:bg-green-600 text-white py-3 rounded-xl text-center font-semibold"
                        >
                          {item.name}
                        </a>
                      ))}
                    </div>

                    <button
                      onClick={() => setOpenWA(false)}
                      className="mt-4 w-full text-sm text-gray-500"
                    >
                      Close
                    </button>

                  </div>
                </div>
              )}
            </div>

          </motion.div>
        </div>
      </div>
    </div>
  );
}