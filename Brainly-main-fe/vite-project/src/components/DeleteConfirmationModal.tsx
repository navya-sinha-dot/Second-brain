import { useEffect } from "react";
import { Button } from "./Button";
import { CrossIcon } from "../Icons/CrossIcon";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

export function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
}: DeleteConfirmationModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        event.preventDefault();
        onConfirm();
      } else if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onConfirm, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/40 backdrop-blur-md px-4 transition-all duration-300"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[2rem] shadow-2xl w-full max-w-sm p-10 transform transition-all animate-in fade-in zoom-in duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-1.5 rounded-full hover:bg-gray-100 transition-colors text-gray-400 hover:text-gray-600"
          aria-label="Close"
        >
          <CrossIcon />
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-16 w-16 rounded-full bg-blue-50 mb-6">
            <div className="flex items-center justify-center h-10 w-10 rounded-full border-2 border-blue-500">
              <span className="text-blue-600 font-bold text-xl">!</span>
            </div>
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3">
            Confirm Delete
          </h3>
          <p className="text-center text-sm text-gray-500 mb-8 leading-relaxed">
            Are you sure you want to delete{" "}
            <span className="font-semibold text-gray-800">"{title}"</span>? This
            action cannot be undone.
          </p>

          <div className="flex gap-4 w-full justify-center">
            <Button
              variants="secondary"
              innertext="Cancel"
              onClick={onClose}
              className="px-8 bg-blue-50 text-blue-600 hover:bg-blue-100 border-none rounded-xl"
            />
            <Button
              variants="primary"
              innertext="Delete"
              onClick={onConfirm}
              className="px-8 rounded-xl shadow-lg shadow-red-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
