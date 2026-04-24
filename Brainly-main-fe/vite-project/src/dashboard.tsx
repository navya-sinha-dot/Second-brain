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
import { DeleteConfirmationModal } from "./components/DeleteConfirmationModal";
import { Menu, LogOut, Share2 } from "lucide-react";

export function Dashboard() {
  const [modal, setModalOpen] = useState(false);
  const [isSharing, setIsSharing] = useState(false);
  const [sharedLinks, setSharedLinks] = useState<{ hash: string }[]>([]);
  const [filter, setFilter] = useState("all");
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const navigate = useNavigate();
  const { content: contents, setContent: setContents, refresh } = useContent();

  const [deleteConfig, setDeleteConfig] = useState<{
    id: string;
    title: string;
  } | null>(null);

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

  const confirmDelete = async () => {
    if (!deleteConfig || !deleteConfig.id) {
      alert("Invalid content ID. Please refresh and try again.");
      setDeleteConfig(null);
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.delete(`${BACKEND_URL}/api/v1/content/${deleteConfig.id}`, {
        headers: { token },
      });

      setContents((prev) => prev.filter((c) => c._id !== deleteConfig.id));
      setDeleteConfig(null);
    } catch (error) {
      console.error("Failed to delete content", error);
      alert("Failed to delete content. Please try again.");
      setDeleteConfig(null);
    }
  };

  const filteredContents = contents?.filter((item) => {
    if (filter === "all") return true;
    return item.type === filter;
  });

  return (
    <div className="flex min-h-screen w-full bg-neo-bg overflow-x-hidden">
      <div
        className={`fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out ${isSidebarVisible ? "translate-x-0" : "-translate-x-64"
          }`}
      >
        <Sidebar activeFilter={filter} onFilter={setFilter} />
      </div>

      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${isSidebarVisible ? "pl-64" : "pl-0"
          }`}
      >
        <CreateContentModal
          refresh={refresh}
          open={modal}
          onClose={() => {
            setModalOpen(false);
          }}
        />

        <DeleteConfirmationModal
          isOpen={!!deleteConfig}
          onClose={() => setDeleteConfig(null)}
          onConfirm={confirmDelete}
          title={deleteConfig?.title || ""}
        />

        <div className="bg-white border-b border-gray-100 px-8 py-4 sticky top-0 z-10">
          <div className="flex justify-between items-center max-w-7xl mx-auto w-full">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarVisible(!isSidebarVisible)}
                className="p-2 hover:bg-gray-50 rounded-lg transition-colors text-neo-gray"
                title={isSidebarVisible ? "Collapse Sidebar" : "Expand Sidebar"}
              >
                <Menu size={20} />
              </button>
              <h1 className="text-3xl font-black text-neo-dark-blue hidden sm:block uppercase tracking-tight">
                My Second Brain
              </h1>
            </div>
            <div className="flex items-center gap-3">
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
                innertext={isSharing ? "Sharing..." : "Share"}
                onClick={handleShare}
                startIcon={<Share2 size={18} />}
                disabled={isSharing}
              />
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-neo-gray hover:text-neo-blue font-medium text-sm px-4 py-2 transition-colors"
              >
                <LogOut size={18} />
                Logout
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-auto bg-slate-50/50">
          <div className="max-w-7xl mx-auto px-8 py-10">
            {sharedLinks.length > 0 && filter === "all" && (
              <div className="mb-8 neo-card">
                <h2 className="text-xl font-bold text-neo-dark-blue mb-4 flex items-center gap-2 font-serif italic">
                  <Share2 size={20} />
                  Public Shared Links
                </h2>
                <div className="flex flex-wrap gap-4">
                  {sharedLinks.map(({ hash }) => (
                    <button
                      key={hash}
                      onClick={() => navigate(`/share/${hash}`)}
                      className="neo-btn bg-blue-50 text-neo-blue border border-blue-100/50 px-4 py-2 text-sm font-semibold"
                      title={`https://brain.navyasinha.xyz/share/${hash}`}
                    >
                      share/{hash}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {filteredContents ? (
              filteredContents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContents.map((item) => (
                    <Card
                      key={item._id}
                      id={item._id}
                      title={item.title}
                      link={item.link}
                      type={item.type}
                      onDeleteClick={(id, title) =>
                        setDeleteConfig({ id, title })
                      }
                    />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-20">
                  <div className="p-8 neo-card bg-blue-50/50 mb-6 group transition-all">
                    <svg
                      className="w-16 h-16 text-neo-blue group-hover:scale-110 transition-transform"
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
                  <h3 className="text-3xl font-serif text-neo-dark-blue mb-3 italic">
                    {filter === "all" ? "Empty Brain" : `No ${filter}s Found`}
                  </h3>
                  <p className="text-lg font-medium text-neo-gray">
                    {filter === "all" ? "Add your first content to get started" : `Try changing your filter or add a new ${filter}`}
                  </p>
                  {filter !== "all" && (
                    <button
                      onClick={() => setFilter("all")}
                      className="mt-6 neo-btn bg-neo-blue text-white px-8 py-3 font-bold shadow-lg shadow-blue-100 hover:shadow-blue-200"
                    >
                      Show All
                    </button>
                  )}
                </div>
              )
            ) : (
              <div className="flex justify-center py-20">
                <div className="animate-spin h-12 w-12 neo-border border-t-neo-blue"></div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
