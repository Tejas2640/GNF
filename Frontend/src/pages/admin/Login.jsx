import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
} from "lucide-react";
import api from "../../api/axios";

export default function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] =
    useState({
      email: "",
      password: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } =
        await api.post(
          "/admin/login",
          formData
        );

      localStorage.setItem(
        "token",
        data.token
      );

      localStorage.setItem(
        "admin",
        JSON.stringify(
          data.admin
        )
      );

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data
          ?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden flex items-center justify-center">

      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center animate-slowZoom"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511818966892-d7d671e672a2?q=80&w=2070')",
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/80" />

      {/* Glow Effects */}
      <div className="absolute top-10 left-10 w-96 h-96 bg-yellow-500/20 rounded-full blur-3xl animate-pulse" />

      <div className="absolute bottom-10 right-10 w-96 h-96 bg-orange-500/20 rounded-full blur-3xl animate-pulse" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8">

        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-8 shadow-2xl">

          <div className="text-center mb-8">

            <h1 className="text-4xl font-bold text-white">
              Gurunanak Fabrications
            </h1>

            <p className="text-gray-300 mt-2">
              Admin Login
            </p>

          </div>

          <form
            onSubmit={submitHandler}
            className="space-y-5"
          >

            {/* Email */}

            <div className="relative">

              <Mail
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type="email"
                name="email"
                placeholder="Admin Email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none"
              />

            </div>

            {/* Password */}

            <div className="relative">

              <Lock
                size={20}
                className="absolute left-4 top-4 text-gray-400"
              />

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Password"
                value={
                  formData.password
                }
                onChange={
                  handleChange
                }
                required
                className="w-full pl-12 pr-12 py-4 rounded-xl bg-white/10 border border-white/20 text-white placeholder-gray-400 outline-none"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
                className="absolute right-4 top-4 text-gray-400"
              >
                {showPassword ? (
                  <EyeOff size={20} />
                ) : (
                  <Eye size={20} />
                )}
              </button>

            </div>

            {/* Login Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold py-4 rounded-xl transition-all duration-300"
            >
              {loading
                ? "Logging In..."
                : "Login"}
            </button>

          </form>

        </div>

      </div>

    </div>
  );
}