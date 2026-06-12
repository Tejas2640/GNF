import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [editId, setEditId] = useState(null);

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    images: [],
  });

  const token = localStorage.getItem("token");

  const fetchProducts = async () => {
    const res = await axios.get("http://localhost:1503/api/products");
    setProducts(res.data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFiles = (e) => {
    setForm({ ...form, images: e.target.files });
  };

  const reset = () => {
    setForm({ name: "", price: "", description: "", images: [] });
    setEditId(null);
  };

  const addProduct = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("description", form.description);

    for (let i = 0; i < form.images.length; i++) {
      fd.append("images", form.images[i]);
    }

    await axios.post("http://localhost:1503/api/products", fd, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
    });

    reset();
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await axios.delete(`http://localhost:1503/api/products/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    fetchProducts();
  };

  const startEdit = (p) => {
    setEditId(p._id);
    setForm({
      name: p.name,
      price: p.price,
      description: p.description,
      images: [],
    });
  };

  const updateProduct = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", form.name);
    fd.append("price", form.price);
    fd.append("description", form.description);

    for (let i = 0; i < form.images.length; i++) {
      fd.append("images", form.images[i]);
    }

    await axios.put(
      `http://localhost:1503/api/products/${editId}`,
      fd,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    reset();
    fetchProducts();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white">

      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-125 h-125 bg-purple-500 blur-[140px] opacity-20 animate-pulse top-10 left-10" />
        <div className="absolute w-125 h-125 bg-blue-500 blur-[140px] opacity-20 animate-pulse bottom-10 right-10" />
      </div>

      <div className="max-w-7xl mx-auto p-8">

        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Product Management
          </h1>
          <p className="text-gray-400 mt-2">
            Add, edit and manage your products
          </p>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={editId ? updateProduct : addProduct}
          className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl hover:shadow-purple-500/20 transition mb-10"
        >

          <div className="grid md:grid-cols-2 gap-4">

            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Product Name"
              className="p-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-purple-400"
            />

            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              placeholder="Price"
              className="p-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-purple-400"
            />

          </div>

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="mt-4 w-full p-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-purple-400"
          />

          <input
            type="file"
            multiple
            onChange={handleFiles}
            className="mt-4"
          />

          <button className="mt-5 bg-linear-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
            {editId ? "Update Product" : "Add Product"}
          </button>

        </form>

        {/* PRODUCT GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {products.map((p) => (
            <div
              key={p._id}
              className="group relative rounded-3xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg hover:scale-[1.03] transition duration-300"
            >

              {/* IMAGE */}
              <div className="h-52 overflow-hidden">
                <img
                  src={p.images?.[0]?.url}
                  alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                />
              </div>

              {/* CONTENT */}
              <div className="p-5">
                <h2 className="text-xl font-bold">{p.name}</h2>
                <p className="text-purple-300 font-semibold mt-1">
                  ₹{p.price}
                </p>

                <p className="text-gray-400 text-sm mt-2 line-clamp-2">
                  {p.description}
                </p>

                {/* BUTTONS */}
                <div className="flex gap-3 mt-4">

                  <button
                    onClick={() => startEdit(p)}
                    className="flex-1 bg-yellow-500 text-black py-2 rounded-xl hover:scale-105 transition"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteProduct(p._id)}
                    className="flex-1 bg-red-500 text-white py-2 rounded-xl hover:scale-105 transition"
                  >
                    Delete
                  </button>

                </div>

              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}