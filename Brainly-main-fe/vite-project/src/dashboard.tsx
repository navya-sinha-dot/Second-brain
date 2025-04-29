import { Button } from "./components/Button";
import { PlusIcon } from "./Icons/Plusicon";
import { ShareIcon } from "./Icons/ShareIcon";
import { Card } from "./components/Card";
import { CreateContentModal } from "./components/CreateContentModal";
import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { useContent } from "./hooks/useContent";
import { BACKEND_URL } from "./config";
import axios from "axios";

export function Dashboard() {
  const [modal, setModalOpen] = useState(false);

  const contents = useContent();
  return (
    <div className="flex">
      <div className="border-gray-2">
        <Sidebar />
      </div>
      <div className="bg-linear-to-l from-slate-100 to-purple-300 min-h-screen p-4 w-full">
        <CreateContentModal
          open={modal}
          onClose={() => {
            setModalOpen(false);
          }}
        />
        <div className="flex justify-end gap-4 pt-4">
          <Button
            onClick={() => {
              setModalOpen(true);
            }}
            variants="primary"
            innertext="Add Content"
            startIcon={<PlusIcon />}
          />
          <Button
            variants="secondary"
            innertext="Share Brain"
            onClick={async () => {
              const response = await axios.post(
                `${BACKEND_URL}/api/v1/brain/share`,
                {
                  share: true,
                },
                {
                  headers: {
                    token: localStorage.getItem("token"),
                  },
                }
              );
              const shareUrl = `http://localhost:5173/share/ ${response.data.hash}`;
              alert(shareUrl);
            }}
            startIcon={<ShareIcon />}
          />
        </div>

        <div className="flex gap-4 flex-wrap">
          {contents.map(({ type, link, title }) => (
            <Card type={type} link={link} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}
