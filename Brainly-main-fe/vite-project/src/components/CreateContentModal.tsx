import { CrossIcon } from "../Icons/CrossIcon";
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
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md px-4">
      <div className="relative bg-neo-white neo-border shadow-neo-lg w-full max-w-md sm:max-w-lg p-8 sm:p-10">
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 hover:bg-neo-blue neo-border border-transparent hover:border-black transition-all"
        >
          <CrossIcon />
        </button>

        <h2 className="text-3xl font-black text-black mb-8 text-center uppercase tracking-tighter">
          Add New Brain
        </h2>

        <div className="flex flex-col items-center gap-6">
          <div className="w-full">
            <Input placeholder="Title" reference={titleRef} />
          </div>

          <div className="w-full">
            {type === ContentType.Youtube ? (
              <Input placeholder="YouTube Link" reference={linkRef} />
            ) : (
              <div className="space-y-3 w-full">
                <div
                  onClick={openFileDialog}
                  className="cursor-pointer neo-border border-dashed py-4 px-4 bg-white hover:bg-neo-green transition-colors text-black font-bold text-sm text-center uppercase tracking-tight"
                >
                  {file ? (
                    <span>{file.name}</span>
                  ) : (
                    <span>Select PDF File</span>
                  )}
                </div>

                <input
                  id="pdf-upload"
                  type="file"
                  accept="application/pdf"
                  className="hidden"
                  onChange={(e) => {
                    const selected = e.target.files?.[0] ?? null;
                    setFile(selected);
                    if (selected) {
                      const url = URL.createObjectURL(selected);
                      setPreviewUrl(url);
                    } else {
                      setPreviewUrl(null);
                    }
                  }}
                />

                {previewUrl && (
                  <iframe
                    src={previewUrl}
                    title="PDF Preview"
                    className="w-full h-64 neo-border"
                  />
                )}
              </div>
            )}
          </div>

          <div className="flex justify-center gap-4 w-full">
            <Button
              variants={type === ContentType.Youtube ? "primary" : "secondary"}
              innertext="YouTube Mode"
              onClick={() => setType(ContentType.Youtube)}
              className="flex-1"
            />
            <Button
              variants={type === ContentType.PDF ? "primary" : "secondary"}
              innertext="PDF Mode"
              onClick={() => setType(ContentType.PDF)}
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex justify-center mt-10">
          <Button
            variants="primary"
            innertext={isLoading ? "Adding..." : "Add Content"}
            onClick={addContent}
            disabled={isLoading}
            className="w-full bg-neo-green py-4 text-lg"
          />
        </div>
      </div>
    </div>
  );
}
