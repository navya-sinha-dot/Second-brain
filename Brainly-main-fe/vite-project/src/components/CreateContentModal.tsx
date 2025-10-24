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
}: {
  open: boolean;
  onClose: () => void;
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
          { headers: { token: localStorage.getItem("token") } }
        );
      } else {
        if (!file) {
          alert("Please select a PDF file.");
          setIsLoading(false);
          return;
        }

        const form = new FormData();
        form.append("title", title);
        form.append("type", type);
        form.append("file", file);

        await axios.post(`${BACKEND_URL}/upload-pdf`, form, {
          headers: {
            token: localStorage.getItem("token"),
            "Content-Type": "multipart/form-data",
          },
        });
      }

      onClose();
    } catch (err) {
      console.error(err);
      alert("Upload failed. Try again.");
    } finally {
      setIsLoading(false);
    }
  }

  function openFileDialog() {
    document.getElementById("pdf-upload")?.click();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-700/40 backdrop-blur-sm px-4">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md sm:max-w-lg p-8 sm:p-10">
        
        <button
          aria-label="Close"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-100 transition"
        >
          <CrossIcon />
        </button>

       
        <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
          Add New Content
        </h2>

       
        <div className="flex flex-col items-center">
         
          <div className="max-w-sm">
            <Input placeholder="Title" reference={titleRef} />
          </div>

          
          <div className="max-w-sm">
            {type === ContentType.Youtube ? (
              <Input placeholder="YouTube Link" reference={linkRef} />
            ) : (
              <div className="space-y-2">
                <div
                  onClick={openFileDialog}
                  className="cursor-pointer rounded-xl border border-dashed border-gray-300 py-3 px-4 bg-white hover:bg-gray-50 transition text-gray-700 text-sm"
                >
                  {file ? (
                    <span className="font-medium">{file.name}</span>
                  ) : (
                    <span className="text-gray-400">
                      Select a PDF from your computer
                    </span>
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
                  }}
                />
                <p className="text-xs text-gray-400">Only PDF files are allowed.</p>
              </div>
            )}
          </div>

         
          <div className="flex justify-center gap-4 pt-2">
            <Button
              variants={type === ContentType.Youtube ? "primary" : "secondary"}
              innertext="YouTube"
              onClick={() => setType(ContentType.Youtube)}
            />
            <Button
              variants={type === ContentType.PDF ? "primary" : "secondary"}
              innertext="PDF"
              onClick={() => setType(ContentType.PDF)}
            />
          </div>
        </div>

      
        <div className="flex justify-center mt-5">
          <Button
            variants="primary"
            innertext={isLoading ? "Submitting..." : "Submit"}
            onClick={addContent}
            disabled={isLoading}
          />
        </div>
      </div>
    </div>
  );
}
