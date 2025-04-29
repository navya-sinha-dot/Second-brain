import { ShareIcon } from "../Icons/ShareIcon";

interface Cardprops {
  title: string;
  link: string;
  type: "Twitter" | "Youtube";
}

export function Card({ title, link, type }: Cardprops) {
  return (
    <div>
      <div className="p-4 max-w-72 bg-white rounded-xl shadow-xl border-slate-100 border min-h-46">
        <div className="flex justify-between">
          <div className="flex items-center">
            <div className="text-gray-500 pr-2 ">
              <ShareIcon />
            </div>
            {title}
          </div>
          <div className="flex">
            <div className="pr-3 text-gray-500">
              <ShareIcon />
            </div>
            <div className="text-gray-500">
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
          {type == "twitter" && (
            <blockquote className="twitter-tweet">
              <a href={link}></a>
            </blockquote>
          )}
        </div>
      </div>
    </div>
  );
}
