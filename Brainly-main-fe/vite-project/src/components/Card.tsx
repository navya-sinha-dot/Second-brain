import { useState } from "react";
import { ShareIcon } from "../Icons/ShareIcon";
import { DustbinIcon } from "../Icons/DustbinIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "PDF" | "Youtube";
  onDelete?: (id: string) => void;
}

export function Card({ id, title, link, type, onDelete }: CardProps) {
  const [notification, setNotification] = useState<{
    message: string;
    type: "success" | "error" | null;
  }>({ message: "", type: null });

  const handleDelete = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setNotification({ message: "Not authorized", type: "error" });
      return;
    }

    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/v1/content/${id}`,
        {
          headers: { token },
        }
      );

      console.log("Delete response:", response.data);
      if (onDelete) onDelete(id);

      setNotification({
        message: "Content deleted successfully!",
        type: "success",
      });

      setTimeout(() => setNotification({ message: "", type: null }), 3000);
    } catch (error: any) {
      console.error("Failed to delete content", error);
      setNotification({
        message: error.response?.data?.message || "Failed to delete content",
        type: "error",
      });
    }
  };

  // Handle click to open PDF in new tab
  const openPdfInNewTab = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative p-4 max-w-72 bg-white rounded-xl shadow-xl border-blue-100 border min-h-46 transition-transform hover:scale-[1.02]">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="text-blue-600 pr-2">
            <DocumentIcon />
          </div>
          <p className="font-medium text-gray-800 truncate w-40">{title}</p>
        </div>

        <div className="flex">
          <button
            onClick={handleDelete}
            className="pr-3 text-blue-600 hover:text-red-500 transition-colors"
            title="Delete"
          >
            <DustbinIcon />
          </button>

          <div className="text-blue-600">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ShareIcon />
            </a>
          </div>
        </div>
      </div>

      {/* PREVIEW SECTION */}
      <div className="pt-3">
        {type === "Youtube" && link && (
          <iframe
            className="w-full rounded-xl h-48"
            src={link.replace("watch?v=", "embed/")}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>
        )}

        {type === "PDF" && link && (
          <div
            className="mt-2 cursor-pointer group relative"
            onClick={openPdfInNewTab}
          >
            <iframe
              src={`${link}#toolbar=1&zoom=page-width`}
              className="w-full h-64 rounded-lg border border-gray-200 pointer-events-none"
              title={title}
            ></iframe>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 rounded-lg transition"></div>
          </div>
        )}
      </div>

      {/* Notification Toast */}
      {notification.type && (
        <div
          className={`mt-3 text-sm rounded-lg px-3 py-2 ${
            notification.type === "success"
              ? "bg-green-100 text-green-700 border border-green-300"
              : "bg-red-100 text-red-700 border border-red-300"
          }`}
        >
          {notification.message}
        </div>
      )}
    </div>
  );
}
