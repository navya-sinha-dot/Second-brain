import { ShareIcon } from "../Icons/ShareIcon";
import { DustbinIcon } from "../Icons/DustbinIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface Cardprops {
  id: string; // <-- Add this
  title: string;
  link: string;
  type: "PDF" | "Youtube";
  onDelete?: (id: string) => void; 
}

export function Card({ id, title, link, type, onDelete }: Cardprops) {

const handleDelete = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Not authorized");
    return;
  }

  try {
    const response = await axios.delete(`${BACKEND_URL}/api/v1/content/${id}`, {
      headers: {
        token: token,
      },
    });

    console.log("Delete response:", response.data);
    if (onDelete) {
      onDelete(id); // update UI after delete
    }
    alert("Content deleted successfully!");
  } catch (error: any) {
    console.error("Failed to delete content", error);
    alert(
      `Failed to delete content: ${error.response?.data?.message || error.message}`
    );
  }
};


  return (
    <div>
      <div className="p-4 max-w-72 bg-white rounded-xl shadow-xl border-blue-100 border min-h-46">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="text-blue-600 pr-2 ">
              <DocumentIcon />
            </div>
            {title}
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

        <div className="pt-3 ">
          {type === "Youtube" && (
            <iframe
              className="w-full rounded-xl"
              src={link.replace("watch", "embed").replace("?v=", "/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          )}
          {type === "PDF" && (
            <div className="mt-2 text-sm">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Open full PDF
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
