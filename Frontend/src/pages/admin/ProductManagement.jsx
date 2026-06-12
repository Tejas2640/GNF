import { useEffect, useState } from "react";
import api from "../../api/axios";

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

  // ✅ SAFE FETCH (FIXED)
  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      const data = res.data;

      // 🔥 SAFE CHECK (MOST IMPORTANT FIX)
      if (Array.isArray(data)) {
        setProducts(data);
      } else if (Array.isArray(data?.products)) {
        setProducts(data.products);
      } else {
        console.log("Unexpected API format:", data);
        setProducts([]);
      }

    } catch (err) {
      console.log("Fetch Error:", err.message);
      setProducts([]);
    }
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

    try {
      await api.post("/products", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      reset();
      fetchProducts();
    } catch (err) {
      console.log("Add Error:", err.message);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchProducts();
    } catch (err) {
      console.log("Delete Error:", err.message);
    }
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

    try {
      await api.put(`/products/${editId}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      reset();
      fetchProducts();
    } catch (err) {
      console.log("Update Error:", err.message);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-slate-950 text-white">

      {/* BACKGROUND */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-125 h-125 bg-purple-500 blur-[140px] opacity-20 animate-pulse top-10 left-10" />
        <div className="absolute w-125 h-125 bg-blue-500 blur-[140px] opacity-20 animate-pulse bottom-10 right-10" />
      </div>

      <div className="max-w-7xl mx-auto p-8">

        <h1 className="text-4xl font-bold">Product Management</h1>
        <p className="text-gray-400 mt-2">
          Add, edit and manage your products
        </p>

        {/* FORM */}
        <form
          onSubmit={editId ? updateProduct : addProduct}
          className="backdrop-blur-xl bg-white/5 border border-white/10 p-6 rounded-3xl shadow-xl mb-10"
        >

          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="p-3 rounded-xl bg-white/10 border border-white/10"
          />

          <input
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            className="p-3 rounded-xl bg-white/10 border border-white/10"
          />

          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Description"
            rows="3"
            className="mt-4 w-full p-3 rounded-xl bg-white/10 border border-white/10"
          />

          <input type="file" multiple onChange={handleFiles} />

          <button className="mt-5 bg-linear-to-r from-purple-500 to-blue-500 px-6 py-3 rounded-xl">
            {editId ? "Update Product" : "Add Product"}
          </button>

        </form>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8">

          {Array.isArray(products) && products.length > 0 ? (
            products.map((p) => (
              <div key={p._id} className="p-5 bg-white/5 rounded-xl">

                <img
                  src={p.images?.[0]?.url || "https://via.placeholder.com/300"}
                  alt={p.name}
                />

                <h2>{p.name}</h2>
                <p>₹{p.price}</p>

                <button onClick={() => startEdit(p)}>Edit</button>
                <button onClick={() => deleteProduct(p._id)}>Delete</button>

              </div>
            ))
          ) : (
            <p className="text-gray-400">No products found</p>
          )}

        </div>

      </div>
    </div>
  );
}