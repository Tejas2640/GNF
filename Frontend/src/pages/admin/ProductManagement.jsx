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

  const fetchProducts = async () => {
    try {
      const res = await api.get("/products");

      const data = res.data;

      const list = Array.isArray(data)
        ? data
        : Array.isArray(data?.products)
        ? data.products
        : Array.isArray(data?.data)
        ? data.data
        : [];

      setProducts(list);
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

    await api.post("/products", fd, {
      headers: { Authorization: `Bearer ${token}` },
    });

    reset();
    fetchProducts();
  };

  const deleteProduct = async (id) => {
    await api.delete(`/products/${id}`, {
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

    await api.put(`/products/${editId}`, fd, {
      headers: { Authorization: `Bearer ${token}` },
    });

    reset();
    fetchProducts();
  };

  return (
    <div className="min-h-screen text-white bg-slate-950">

      <div className="max-w-6xl mx-auto p-8">

        <h1 className="text-3xl font-bold">Product Management</h1>

        <form onSubmit={editId ? updateProduct : addProduct}>
          <input name="name" value={form.name} onChange={handleChange} />
          <input name="price" value={form.price} onChange={handleChange} />
          <textarea name="description" value={form.description} onChange={handleChange} />
          <input type="file" multiple onChange={handleFiles} />

          <button type="submit">
            {editId ? "Update" : "Add"}
          </button>
        </form>

        <div className="grid md:grid-cols-3 gap-4 mt-10">

          {products.length > 0 ? (
            products.map((p) => (
              <div key={p._id} className="p-4 bg-white/10">
                <img src={p.images?.[0]?.url} />
                <h2>{p.name}</h2>
                <p>₹{p.price}</p>

                <button onClick={() => startEdit(p)}>Edit</button>
                <button onClick={() => deleteProduct(p._id)}>Delete</button>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}

        </div>

      </div>
    </div>
  );
}