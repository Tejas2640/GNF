import Sidebar from "/src/components/admin/Sidebar";
import { Outlet } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-white flex">

      {/* 🔥 Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-150 h-150 bg-purple-500/30 rounded-full blur-3xl animate-pulse -top-50 -left-50" />
        <div className="absolute w-125 h-125 bg-blue-500/30 rounded-full blur-3xl animate-pulse -bottom-50 -right-50" />
        <div className="absolute w-100 h-100 bg-yellow-500/20 rounded-full blur-3xl animate-pulse top-[40%] left-[40%]" />
      </div>

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-10 backdrop-blur-xl">

        {/* Top Glass Header */}
        <div className="mb-10">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl shadow-lg">
            <h1 className="text-3xl md:text-4xl font-bold">
              Admin Dashboard
            </h1>

            <p className="text-white/60 mt-2">
              Manage your business, products and enquiries in one place.
            </p>
          </div>
        </div>

        {/* Content Area (Routes) */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-6 md:p-10 min-h-[70vh] backdrop-blur-xl shadow-xl transition-all duration-300 hover:bg-white/10">

          {/* Child Pages Render Here */}
          <Outlet />

        </div>

      </main>
    </div>
  );
}