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

  const contentArray = data?.content?.length ? data.content : [];

  return (
    <div className="flex bg-neo-bg min-h-screen">
      <div className="w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-neo-white neo-border border-l-0 border-r-0 border-t-0 px-8 py-5 sticky top-0 z-10 shadow-neo">
          <h1 className="text-3xl font-black text-black uppercase tracking-tighter">
            {data?.username
              ? `${data.username}'s Brain`
              : "Shared Brain"}
          </h1>
        </div>

        <div className="flex-1 overflow-auto p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentArray.length > 0 ? (
              contentArray.map((item: any) => (
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
              <div className="col-span-full flex flex-col items-center justify-center py-20">
                <div className="text-black font-black uppercase tracking-tighter text-2xl">
                  No content shared yet.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
