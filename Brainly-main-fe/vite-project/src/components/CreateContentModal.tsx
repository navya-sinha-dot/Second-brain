import { X, Youtube, FileText, Plus } from "lucide-react";
import { Button } from "./Button";
import { Input } from "./InputComponent";
import { useRef, useState } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config";

enum ContentType {
  Youtube = "Youtube",
  PDF = "PDF",
}

export function CreateContentModal({
  open,
  onClose,
  refresh,
}: {
  open: boolean;
  onClose: () => void;
  refresh: () => void;
}) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  if (!open) return null;

  async function addContent() {
    const title = titleRef.current?.value?.trim();
    if (!title) {
      alert("Please add a title.");
      return;
    }

    setIsLoading(true);

    try {
      if (type === ContentType.Youtube) {
        const link = linkRef.current?.value?.trim();
        if (!link) {
          alert("Please add a YouTube link.");
          setIsLoading(false);
          return;
        }

        await axios.post(
          `${BACKEND_URL}/content`,
          { title, link, type },
          {
            headers: { token: localStorage.getItem("token") || "" },
          }
        );
      } else {
        if (!file) {
          alert("Please select a PDF file.");
          setIsLoading(false);
          return;
        }
        const sigRes = await axios.get(
          `${BACKEND_URL}/api/v1/cloudinary-signature`,
          {
            headers: { token: localStorage.getItem("token") || "" },
          }
        );

        const { timestamp, signature, cloudName, apiKey, folder } = sigRes.data;

        const formData = new FormData();
        formData.append("file", file);
        formData.append("api_key", apiKey);
        formData.append("timestamp", timestamp);
        formData.append("signature", signature);
        formData.append("folder", folder);
        formData.append("resource_type", "auto");

        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

        const uploadRes = await axios.post(cloudinaryUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        const uploadedUrl = uploadRes.data.secure_url;
        await axios.post(
          `${BACKEND_URL}/api/v1/save-pdf`,
          { title, link: uploadedUrl, type: "PDF" },
          {
            headers: { token: localStorage.getItem("token") || "" },
          }
        );

        window.open(uploadedUrl, "_blank");
      }

      refresh();
      onClose();
    } catch (err: any) {
      console.error("Upload error:", err.response?.data || err.message);
      alert("Upload failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function openFileDialog() {
    document.getElementById("pdf-upload")?.click();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="relative bg-white rounded-[32px] shadow-neo-xl w-full max-w-md sm:max-w-lg p-10 border border-gray-100 flex flex-col gap-8">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neo-gray/50 hover:text-neo-text hover:bg-gray-50 rounded-full transition-all"
        >
          <X size={20} />
        </button>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-neo-text mb-2">
            Add New Content
          </h2>
          <p className="text-sm text-neo-gray font-medium">Capture ideas, videos, and documents instantly.</p>
        </div>

        <div className="flex flex-col gap-6">
          <div className="flex bg-gray-50 p-1.5 rounded-2xl border border-gray-100/50">
            <button
              onClick={() => setType(ContentType.Youtube)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-semibold text-sm ${type === ContentType.Youtube
                  ? "bg-white text-neo-blue shadow-sm"
                  : "text-neo-gray hover:text-neo-blue"
                }`}
            >
              <Youtube size={18} />
              YouTube
            </button>
            <button
              onClick={() => setType(ContentType.PDF)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-semibold text-sm ${type === ContentType.PDF
                  ? "bg-white text-neo-blue shadow-sm"
                  : "text-neo-gray hover:text-neo-blue"
                }`}
            >
              <FileText size={18} />
              PDF Document
            </button>
          </div>

          <div className="space-y-4">
            <div className="w-full">
              <label className="text-xs font-bold text-neo-gray/60 uppercase tracking-widest ml-1 mb-2 block">Content Title</label>
              <Input placeholder="Enter a descriptive title" reference={titleRef} />
            </div>

            <div className="w-full">
              {type === ContentType.Youtube ? (
                <>
                  <label className="text-xs font-bold text-neo-gray/60 uppercase tracking-widest ml-1 mb-2 block">YouTube URL</label>
                  <Input placeholder="https://youtube.com/watch?v=..." reference={linkRef} />
                </>
              ) : (
                <div className="space-y-3 w-full">
                  <label className="text-xs font-bold text-neo-gray/60 uppercase tracking-widest ml-1 mb-2 block">PDF Document</label>
                  <div
                    onClick={openFileDialog}
                    className="cursor-pointer border-2 border-dashed border-gray-100 rounded-2xl py-8 px-4 bg-gray-50 hover:bg-neo-light-blue/50 hover:border-neo-blue/20 transition-all text-center group"
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className="p-3 bg-white rounded-full shadow-sm text-neo-blue group-hover:scale-110 transition-all">
                        <Plus size={20} />
                      </div>
                      {file ? (
                        <span className="font-bold text-neo-text text-sm">{file.name}</span>
                      ) : (
                        <div>
                          <p className="font-bold text-neo-text text-sm">Select PDF File</p>
                          <p className="text-[11px] text-neo-gray mt-1">Upload files up to 10MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  <input
                    id="pdf-upload"
                    type="file"
                    accept="application/pdf"
                    className="hidden"
                    onChange={(e) => {
                      const selected = e.target.files?.[0] ?? null;
                      setFile(selected);
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4">
          <Button
            variants="primary"
            innertext={isLoading ? "Saving to your brain..." : "Add Content"}
            onClick={addContent}
            disabled={isLoading}
            className="w-full py-4 text-base shadow-xl shadow-blue-100"
          />
        </div>
      </div>
    </div>
  );
}
