import { useEffect } from "react";
import { Button } from "./Button";
import { X, AlertTriangle } from "lucide-react";

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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-white rounded-[32px] shadow-neo-xl w-full max-w-sm p-10 border border-gray-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 text-neo-gray/50 hover:text-neo-text hover:bg-gray-50 rounded-full transition-all"
          aria-label="Close"
        >
          <X size={20} />
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-20 w-20 bg-neo-orange/10 text-neo-orange rounded-3xl mb-8">
            <AlertTriangle size={40} />
          </div>

          <h3 className="text-2xl font-bold text-neo-text mb-3">
            Confirm Delete
          </h3>
          <p className="text-center text-neo-gray mb-10 leading-relaxed font-medium">
            Are you sure you want to delete <br />
            <span className="font-bold text-neo-text">"{title}"</span>? <br />
            This action cannot be undone.
          </p>

          <div className="flex gap-4 w-full">
            <Button
              variants="secondary"
              innertext="Cancel"
              onClick={onClose}
              className="flex-1 !border-gray-200 !text-neo-gray hover:!bg-gray-50"
            />
            <Button
              variants="danger"
              innertext="Delete"
              onClick={onConfirm}
              className="flex-1 shadow-lg shadow-red-200"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
