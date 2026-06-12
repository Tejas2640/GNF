import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Wrench,
  Truck,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const categories = [
    {
      name: "Main Gates",
      image:
        "https://res.cloudinary.com/dl84t92il/image/upload/v1781258257/gate-products/omvucevzds5laot1km6m.jpg",
    },
    {
      name: "Sliding Gates",
      image:
        "https://res.cloudinary.com/dl84t92il/image/upload/v1781258197/gate-products/xh92kuuuhxs6lwejht2b.jpg",
    },
    {
      name: "Profile Gates",
      image:
        "https://res.cloudinary.com/dl84t92il/image/upload/v1781258027/gate-products/fhdkasfmwf9yvssh6qag.jpg",
    },
    {
      name: "Casting Gates",
      image:
        "https://res.cloudinary.com/dl84t92il/image/upload/v1781258083/gate-products/l8gcasdrjjfw6ds6olg5.jpg",
    },
    {
      name: "Designer Gates",
      image:
        "https://res.cloudinary.com/dl84t92il/image/upload/v1781251581/gate-products/wkpppbgti9hqj41xghh8.jpg",
    },
  ];

  return (
    <div className="bg-white overflow-hidden">

      {/* HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

        {/* Background Image (fixed alignment) */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat scale-105"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2070')",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-b from-black/80 via-black/70 to-black/90" />

        {/* Content */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >

            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
              Guru Nanak
              <span className="block text-yellow-500">
                Fabrications
              </span>
            </h1>

            <p className="mt-6 text-base md:text-lg text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Premium gates manufacturer specializing in Sliding Gates,
              Main Gates, Casting Gates, and Designer Gates.
              Built with precision, durability, and modern design aesthetics.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mt-10">

              <Link
                to="/products"
                className="bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition"
              >
                Explore Products
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/contact"
                className="border border-white/30 text-white px-6 py-3 rounded-xl hover:bg-white/10 transition"
              >
                Contact Us
              </Link>

            </div>

          </motion.div>

        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="py-20 px-6 bg-slate-50">

        <div className="max-w-6xl mx-auto text-center mb-12">

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Why Choose Us
          </h2>

          <p className="text-slate-500 mt-3">
            Quality, trust and craftsmanship you can rely on
          </p>

        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6">

          {[
            {
              icon: <ShieldCheck className="text-yellow-500" size={40} />,
              title: "High Quality Materials",
              desc: "We use premium-grade steel for long-lasting durability.",
            },
            {
              icon: <Wrench className="text-yellow-500" size={40} />,
              title: "Custom Manufacturing",
              desc: "Tailor-made designs for every client requirement.",
            },
            {
              icon: <Truck className="text-yellow-500" size={40} />,
              title: "Fast Delivery",
              desc: "On-time delivery with professional installation support.",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition"
            >
              <div className="mb-4">{item.icon}</div>
              <h3 className="text-xl font-semibold text-slate-900">
                {item.title}
              </h3>
              <p className="text-slate-500 mt-2 text-sm">
                {item.desc}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* GATE CATEGORIES */}
      <section className="py-20 px-6 bg-white">

        <div className="max-w-6xl mx-auto text-center mb-12">

          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Our Gate Categories
          </h2>

        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">

          {categories.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03 }}
              className="relative rounded-2xl overflow-hidden shadow-lg group"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-full h-72 object-cover group-hover:scale-110 transition duration-500"
              />

              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute bottom-0 p-5 text-white">
                <h3 className="text-xl font-bold">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-200">
                  Premium Manufacturing
                </p>
              </div>

            </motion.div>
          ))}

        </div>
      </section>

      {/* CTA */}
      <section className="bg-black py-20 px-6">

        <div className="max-w-4xl mx-auto text-center">

          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Looking For Premium Gates?
          </h2>

          <p className="text-gray-300 mt-4">
            Get custom gate solutions designed for your space.
          </p>

          <Link
            to="/contact"
            className="inline-block mt-8 bg-yellow-500 hover:bg-yellow-400 text-black px-6 py-3 rounded-xl font-semibold transition"
          >
            Contact Now
          </Link>

        </div>

      </section>

    </div>
  );
}