import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import api from "../api/axios";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
  try {
    const res = await api.get("/products");

    console.log("API RESPONSE:", res.data);

    setProducts(res.data.products); // ✅ FIXED
  } catch (error) {
    console.log(error);
    setProducts([]);
  }
};

  return (
    <div className="relative min-h-screen overflow-hidden bg-black">

      {/* Animated Background */}
      <div className="absolute inset-0">

        <div className="absolute top-0 left-0 h-96 w-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />

        <div
          className="absolute bottom-0 right-0 h-125 w-125 bg-orange-500/20 rounded-full blur-3xl animate-pulse"
          style={{ animationDelay: "1s" }}
        />

        <div
          className="absolute top-1/2 left-1/2 h-100 w-100 bg-yellow-300/10 rounded-full blur-3xl animate-bounce"
          style={{ animationDuration: "10s" }}
        />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.08) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Header */}
      <div className="relative z-10 py-12">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
            <span className="block bg-linear-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Products
            </span>
          </h1>

          <p className="mt-4 text-sm md:text-base text-slate-400 max-w-xl mx-auto">
            Explore our range of premium gates, including Sliding Gates, Main Gates
          </p>
        </div>
      </div>

      {/* Products */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pb-20">

        {/* Loading */}
        {loading ? (
          <div className="text-center py-32 text-white text-2xl">
            Loading products...
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-32">
            <h2 className="text-3xl text-slate-400">
              No Products Available
            </h2>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">

            {/* SAFE MAP (extra protection) */}
            {Array.isArray(products) &&
              products.map((product) => (
                <div
                  key={product._id}
                  className="group h-137.5 perspective-[1500px]"
                >

                  <div className="relative h-full w-full duration-700 transform-3d group-hover:transform-[rotateY(180deg)]">

                    {/* FRONT */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl backface-hidden">

                      <div className="h-full flex flex-col">

                        <div className="flex-1 flex items-center justify-center p-6 overflow-hidden">

                          <img
                            src={
                              product.images?.[0]?.url ||
                              "https://via.placeholder.com/600x400?text=No+Image"
                            }
                            alt={product.name}
                            className="max-w-full max-h-full object-contain transition duration-700 group-hover:scale-105"
                          />

                        </div>

                        <div className="p-6 border-t border-white/10">

                          <h2 className="text-2xl font-bold text-white text-center">
                            {product.name}
                          </h2>

                          <p className="text-center text-yellow-400 text-3xl font-bold mt-3">
                            ₹{product.price}
                          </p>

                          <p className="text-center text-slate-400 mt-4 text-sm">
                            Hover to View Details
                          </p>

                        </div>

                      </div>

                    </div>

                    {/* BACK */}
                    <div className="absolute inset-0 rounded-3xl overflow-hidden bg-linear-to-br from-slate-900 to-black border border-yellow-500/20 p-8 text-white transform-[rotateY(180deg)] backface-hidden">

                      <div className="h-full flex flex-col">

                        <h2 className="text-3xl font-bold text-yellow-400 mb-6">
                          {product.name}
                        </h2>

                        <div className="flex-1 overflow-y-auto pr-2">

                          <p className="text-slate-300 leading-8">
                            {product.description}
                          </p>

                        </div>

                        <div className="pt-6">

                          <p className="text-4xl font-bold text-yellow-400">
                            ₹{product.price}
                          </p>

                          <button
                            onClick={() => navigate("/contact")}
                            className="w-full mt-6 bg-linear-to-r from-yellow-500 to-orange-500 text-black py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:scale-105 transition"
                          >
                            Enquire Now
                            <ArrowRight size={20} />
                          </button>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>
              ))}

          </div>
        )}

      </div>
    </div>
  );
}