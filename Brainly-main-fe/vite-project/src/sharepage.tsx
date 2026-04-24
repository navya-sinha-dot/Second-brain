import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "./config";
import { Sidebar } from "./components/Sidebar";
import { Card } from "./components/Card";

export default function SharePage() {
  const { hash } = useParams();
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const fetchSharedBrain = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/api/v1/brain/${hash}`);
        if (response.data.message === "incorrect link") {
          setError("Invalid or expired link.");
        } else {
          setData(response.data);
        }
      } catch {
        setError("Failed to load shared content.");
      } finally {
        setLoading(false);
      }
    };
    fetchSharedBrain();
  }, [hash]);

  if (loading)
    return (
      <div className="w-full flex justify-center items-center py-16 bg-neo-bg min-h-screen">
        <div className="animate-spin h-12 w-12 neo-border border-t-neo-blue"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen bg-neo-bg text-red-500 font-black uppercase text-2xl tracking-tighter">
        {error}
      </div>
    );

  const allContent = data?.content || [];
  const filteredContent = allContent.filter((item: any) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <div className="flex bg-[#f8fafc] min-h-screen font-sans">
      <div className="w-64 flex-shrink-0 border-r border-gray-100 bg-white">
        <Sidebar activeFilter={filter} onFilter={setFilter} />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-white px-8 py-6 sticky top-0 z-10 border-b border-gray-100 flex justify-between items-center">
          <h1 className="text-2xl font-black text-[#1a2b3b] tracking-tight uppercase">
            {data?.username ? `${data.username}'s Brain` : "Shared Brain"}
          </h1>
          <div className="text-sm font-semibold text-gray-500 uppercase tracking-widest bg-gray-50 px-4 py-2 rounded-full">
            Public View
          </div>
        </div>

        <div className="flex-1 overflow-auto p-10 bg-[#f8fafc]/50">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredContent.length > 0 ? (
              filteredContent.map((item: any) => (
                <Card
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  link={item.link}
                  type={item.type}
                  onDeleteClick={undefined}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-32 space-y-4">
                <div className="p-10 bg-white rounded-[40px] shadow-sm border border-gray-100">
                  <svg className="w-16 h-16 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-400">
                  {filter === "all" ? "No content shared yet." : `No ${filter}s found.`}
                </h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
