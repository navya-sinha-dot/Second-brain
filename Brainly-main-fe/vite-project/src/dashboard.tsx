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
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [modal, setModalOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const navigate = useNavigate();

  const [contents, setContents] = useContent();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { token: localStorage.getItem("token") } }
      );

      const shareUrl = `https://brain.navyasinha.xyz/share/${response.data.hash}`;
      await navigator.clipboard.writeText(shareUrl);
      alert(`Share URL copied to clipboard: ${shareUrl}`);
    } catch (error) {
      alert("Failed to share brain. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex">
      <div className="border-gray-2">
        <Sidebar />
      </div>
      <div className="bg-gradient-to-l from-white to-blue-50 min-h-screen p-4 w-full">
        <CreateContentModal
          contents={contents}
          setContents={setContents}
          open={modal}
          onClose={() => {
            setModalOpen(false);
          }}
        />

        <div className="flex justify-between items-center pt-4">
          <h1 className="text-3xl font-bold text-gray-800">My Second Brain</h1>
          <div className="flex gap-4">
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
              innertext={isSharing ? "Sharing..." : "Share Brain"}
              onClick={handleShare}
              startIcon={<ShareIcon />}
              disabled={isSharing}
            />
            <Button
              variants="secondary"
              innertext="Logout"
              onClick={handleLogout}
              className="bg-blue-600 hover:bg-blue-700 text-white"
            />
          </div>
        </div>

        <div className="flex gap-4 flex-wrap mt-6">
          {contents ? (
            contents.length > 0 ? (
              contents.map((item) => (
                <Card
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  link={item.link}
                  type={item.type}
                  onDelete={(deletedId) =>
                    setContents((prev) =>
                      prev.filter((c) => c._id !== deletedId)
                    )
                  }
                />
              ))
            ) : (
              <div className="w-full text-center py-12">
                <div className="text-gray-500 text-lg mb-4">No content yet</div>
                <p className="text-gray-400">
                  Click "Add Content" to get started!
                </p>
              </div>
            )
          ) : (
            <div className="w-full flex justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
