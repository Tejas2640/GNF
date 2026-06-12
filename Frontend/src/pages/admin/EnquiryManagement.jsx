import { useEffect, useState } from "react";
import axios from "axios";

export default function EnquiryManagement() {
  const [enquiries, setEnquiries] = useState([]);
  const token = localStorage.getItem("token");

  const fetchEnquiries = async () => {
    try {
      const res = await axios.get(
        "http://localhost:1503/api/enquiries",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setEnquiries(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  const deleteEnquiry = async (id) => {
    await axios.delete(
      `http://localhost:1503/api/enquiries/${id}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchEnquiries();
  };

  const updateStatus = async (id, status) => {
    await axios.put(
      `http://localhost:1503/api/enquiries/${id}`,
      { status },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    fetchEnquiries();
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-[#050816] text-white p-8">

      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute w-125 h-125 bg-blue-600 blur-[160px] opacity-20 top-10 left-10 animate-pulse" />
        <div className="absolute w-125 h-125 bg-purple-600 blur-[160px] opacity-20 bottom-10 right-10 animate-pulse" />
      </div>

      <h2 className="text-4xl font-bold mb-8">
        Enquiry Management
      </h2>

      <div className="grid md:grid-cols-2 gap-6">

        {enquiries.length === 0 && (
          <p className="text-gray-400">No enquiries found</p>
        )}

        {enquiries.map((e) => (
          <div
            key={e._id}
            className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-6 shadow-lg hover:scale-[1.02] transition"
          >

            {/* HEADER */}
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold">{e.name}</h3>
                <p className="text-gray-400 text-sm">
                  {e.email} | {e.phone}
                </p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-xs font-semibold
                ${
                  e.status === "new"
                    ? "bg-blue-500"
                    : e.status === "read"
                    ? "bg-yellow-500"
                    : "bg-green-500"
                }`}
              >
                {e.status}
              </span>
            </div>

            {/* MESSAGE */}
            <p className="mt-4 text-gray-300">
              {e.message}
            </p>

            {/* ACTIONS */}
            <div className="flex gap-3 mt-5">

              <button
                onClick={() => updateStatus(e._id, "read")}
                className="px-3 py-2 rounded-xl bg-yellow-500 text-black hover:scale-105 transition"
              >
                Read
              </button>

              <button
                onClick={() => updateStatus(e._id, "replied")}
                className="px-3 py-2 rounded-xl bg-green-500 text-black hover:scale-105 transition"
              >
                Replied
              </button>

              <button
                onClick={() => deleteEnquiry(e._id)}
                className="px-3 py-2 rounded-xl bg-red-500 hover:scale-105 transition"
              >
                Delete
              </button>

            </div>

          </div>
        ))}

      </div>
    </div>
  );
}