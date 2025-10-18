import { ShareIcon } from "../Icons/ShareIcon";
import { DustbinIcon } from "../Icons/DustbinIcon";
import { DocumentIcon } from "../Icons/DocumentIcon";

interface Cardprops {
  title: string;
  link: string;
  type: "PDF" | "Youtube";
}

export function Card({ title, link, type }: Cardprops) {
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
            <div className="pr-3 text-blue-600">
              <DustbinIcon />
            </div>
            <div className="text-blue-600">
              <a href={link} target="_blank">
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
              allowFullScreen></iframe>
          )}
          {type == "PDF" && (
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
