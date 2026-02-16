import { ShareIcon } from "../Icons/ShareIcon";
import { DustbinIcon } from "../Icons/DustbinIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";

interface CardProps {
  id: string;
  title: string;
  link: string;
  type: "PDF" | "Youtube";
  onDeleteClick?: (id: string, title: string) => void;
}

export function Card({ id, title, link, type, onDeleteClick }: CardProps) {
  const openPdfInNewTab = () => {
    if (link) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div className="relative neo-card min-h-46 transition-all hover:-translate-x-[2px] hover:-translate-y-[2px] hover:shadow-neo-lg overflow-hidden flex flex-col">
      <div className="flex justify-between">
        <div className="flex items-center">
          <div className="text-black pr-2">
            <DocumentIcon />
          </div>
          <p className="font-black text-black truncate w-40 uppercase tracking-tighter text-lg">{title}</p>
        </div>

        <div className="flex">
          {onDeleteClick && (
            <button
              onClick={() => onDeleteClick(id, title)}
              className="pr-3 text-black hover:text-red-500 transition-colors"
              title="Delete"
            >
              <DustbinIcon />
            </button>
          )}

          <div className="text-black">
            <a href={link} target="_blank" rel="noopener noreferrer">
              <ShareIcon />
            </a>
          </div>
        </div>
      </div>

      <div className="pt-3 flex-1 flex flex-col justify-center">
        {type === "Youtube" && link && (
          <iframe
            className="w-full neo-border h-48"
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
            className="mt-2 cursor-pointer group relative flex-1"
            onClick={openPdfInNewTab}
          >
            <iframe
              src={`${link}#toolbar=1&zoom=page-width`}
              className="w-full h-full neo-border pointer-events-none"
              title={title}
            ></iframe>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition"></div>
          </div>
        )}
      </div>
    </div>
  );
}
