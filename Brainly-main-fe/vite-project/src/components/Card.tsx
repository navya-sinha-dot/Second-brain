import { Trash2, Share2 } from "lucide-react";

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
    <div className="relative neo-card min-h-64 transition-all hover:shadow-neo-xl flex flex-col bg-white">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-semibold text-neo-text truncate pr-4 text-base">
          {title}
        </h3>
        
        <div className="flex items-center gap-1">
          {onDeleteClick && (
            <button
              onClick={() => onDeleteClick(id, title)}
              className="p-1.5 text-neo-gray/60 hover:text-neo-orange hover:bg-red-50 rounded-lg transition-all"
              title="Delete"
            >
              <Trash2 size={18} />
            </button>
          )}
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-1.5 text-neo-gray/60 hover:text-neo-blue hover:bg-neo-light-blue rounded-lg transition-all"
            title="Share"
          >
            <Share2 size={18} />
          </a>
        </div>
      </div>

      <div className="flex-1 rounded-xl overflow-hidden border border-gray-100 bg-gray-50/50">
        {type === "Youtube" && link && (
          <iframe
            className="w-full aspect-video h-full"
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
            className="relative h-full cursor-pointer group/pdf"
            onClick={openPdfInNewTab}
          >
            <iframe
              src={`${link}#toolbar=0&zoom=page-fit`}
              className="w-full h-full pointer-events-none"
              title={title}
            ></iframe>
            <div className="absolute inset-0 bg-black/0 group-hover/pdf:bg-black/5 transition-all flex items-center justify-center">
              <div className="bg-white/90 px-3 py-1.5 rounded-full shadow-sm text-xs font-bold text-neo-text opacity-0 group-hover/pdf:opacity-100 transition-all transform translate-y-2 group-hover/pdf:translate-y-0">
                View Document
              </div>
            </div>
          </div>
        )}
      </div>
      
      <div className="mt-4 pt-3 border-t border-gray-50 flex items-center justify-between">
        <span className="text-[11px] font-medium text-neo-gray uppercase tracking-wider">{title}</span>
      </div>
    </div>
  );
}
