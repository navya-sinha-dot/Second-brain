import { ShareIcon } from "../Icons/ShareIcon";
import { DustbinIcon } from "../Icons/DustbinIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "PDF" | "Youtube";
  onDeleteClick: (id: string, title: string) => void;
}

export function Card({ id, title, link, type, onDeleteClick }: CardProps) {
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
            onClick={() => onDeleteClick(id, title)}
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
    </div>
  );
}
