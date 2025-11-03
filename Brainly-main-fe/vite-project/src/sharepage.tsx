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
      <div className="w-full flex justify-center py-16">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );

  if (error)
    return (
      <div className="flex items-center justify-center min-h-screen text-red-500 text-lg">
        {error}
      </div>
    );

  const contentArray = data?.content?.length
    ? data.content
    : data?.content
    ? [data.content]
    : [];

  return (
    <div className="flex">
      <div className="border-gray-2">
        <Sidebar />
      </div>

      <div className="bg-gradient-to-l from-white to-blue-50 min-h-screen p-4 w-full">
        <div className="flex justify-between items-center pt-4">
          <h1 className="text-3xl font-bold text-gray-800">
            {data?.username
              ? `${data.username}'s Second Brain`
              : "Shared Brain"}
          </h1>
        </div>

        {/* Shared Content */}
        <div className="flex gap-4 flex-wrap mt-6">
          {contentArray.length > 0 ? (
            contentArray.map((item: any) => (
              <Card
                key={item._id}
                id={item._id}
                title={item.title}
                link={item.link}
                type={item.type}
                onDelete={() => {}}
              />
            ))
          ) : (
            <div className="w-full text-center py-12">
              <div className="text-gray-500 text-lg mb-4">
                No content shared yet.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
