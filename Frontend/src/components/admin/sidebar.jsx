import {
  LayoutDashboard,
  Package,
  MessageSquare,
  LogOut,
} from "lucide-react";

import { useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/dashboard/products",
      icon: Package,
    },
    {
      name: "Enquiries",
      path: "/dashboard/enquiries",
      icon: MessageSquare,
    },
  ];

  return (
    <aside className="w-72 bg-black text-white min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-10">
        GNF Admin
      </h1>

      {menu.map((item) => {
        const Icon = item.icon;

        return (
          <button
            key={item.name}
            onClick={() => navigate(item.path)}
            className={`w-full flex items-center gap-3 p-4 rounded-xl mb-3 ${
              location.pathname === item.path
                ? "bg-yellow-500 text-black"
                : "hover:bg-gray-800"
            }`}
          >
            <Icon size={20} />
            {item.name}
          </button>
        );
      })}

      <button
        className="w-full flex items-center gap-3 p-4 mt-10 rounded-xl bg-red-500"
        onClick={() => {
          localStorage.removeItem("token");
          navigate("/admin");
        }}
      >
        <LogOut size={20} />
        Logout
      </button>
    </aside>
  );
}