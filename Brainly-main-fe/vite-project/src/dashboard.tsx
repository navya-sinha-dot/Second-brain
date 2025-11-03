import { Button } from "./components/Button";
import { PlusIcon } from "./Icons/Plusicon";
import { ShareIcon } from "./Icons/ShareIcon";
import { Card } from "./components/Card";
import { CreateContentModal } from "./components/CreateContentModal";
import { useEffect, useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { useContent } from "./hooks/useContent";
import { BACKEND_URL } from "./config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const [modal, setModalOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [sharedLinks, setSharedLinks] = useState<{ hash: string }[]>([]);
  const navigate = useNavigate();
  const [contents, setContents] = useContent();

  useEffect(() => {
    const fetchSharedLinks = async () => {
      try {
        const res = await axios.get(`${BACKEND_URL}/api/v1/brain/share/links`, {
          headers: { token: localStorage.getItem("token") },
        });
        setSharedLinks(res.data.links);
      } catch (err) {
        console.error("Failed to fetch shared links");
      }
    };

    fetchSharedLinks();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/v1/brain/share`,
        { share: true },
        { headers: { token: localStorage.getItem("token") } }
      );

      const shareUrl = `https://brain.navyasinha.xyz/share/${data.hash}`;
      await navigator.clipboard.writeText(shareUrl);
      alert(`Share URL copied to clipboard: ${shareUrl}`);
    } catch {
      alert("Failed to share brain. Please try again.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <div className="flex min-h-screen w-full">
      <div className="border-gray-200 w-64 flex-shrink-0">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col">
        <CreateContentModal
          contents={contents}
          setContents={setContents}
          open={modal}
          onClose={() => {
            setModalOpen(false);
          }}
        />

        <div className="bg-white border-b border-gray-200 px-8 py-5 sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              My Second Brain
            </h1>
            <div className="flex gap-3">
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
        </div>

        <div className="flex-1 overflow-auto bg-gray-50">
          <div className="max-w-7xl mx-auto px-8 py-8">
            {/* {sharedLinks.length > 0 && (
              <div className="mb-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h2 className="text-base font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <ShareIcon />
                  Public Shared Links
                </h2>
                <div className="flex flex-wrap gap-3">
                  {sharedLinks.map(({ hash }) => (
                    <button
                      key={hash}
                      onClick={() => navigate(`/share/${hash}`)}
                      className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-all text-left group hover:shadow-sm"
                      title={`https://brain.navyasinha.xyz/share/${hash}`}
                    >
                      <svg
                        className="w-4 h-4 text-blue-600 flex-shrink-0"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                        />
                      </svg>
                      <span className="text-sm text-blue-700 group-hover:text-blue-900 font-medium">
                        share/{hash}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            )} */}

            {contents ? (
              contents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {contents.map((item) => (
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
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No content yet
                  </h3>
                  <p className="text-gray-500 mb-6">
                    Start building your second brain by adding content
                  </p>
                  <Button
                    onClick={() => setModalOpen(true)}
                    variants="primary"
                    innertext="Add Your First Content"
                    startIcon={<PlusIcon />}
                  />
                </div>
              )
            ) : (
              <div className="flex justify-center items-center py-20">
                <div className="flex flex-col items-center gap-4">
                  <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-blue-600"></div>
                  <p className="text-gray-500">Loading your content...</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
