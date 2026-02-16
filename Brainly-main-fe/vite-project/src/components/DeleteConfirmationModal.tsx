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
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-md px-4"
      onClick={onClose}
    >
      <div
        className="relative bg-neo-white neo-border shadow-neo-lg w-full max-w-sm p-10"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 neo-border border-transparent hover:border-black hover:bg-neo-blue transition-all"
          aria-label="Close"
        >
          <CrossIcon />
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center justify-center h-20 w-20 neo-border bg-neo-yellow mb-8 rotate-3">
            <span className="text-black font-black text-4xl">!</span>
          </div>

          <h3 className="text-3xl font-black text-black mb-4 uppercase tracking-tighter">
            Confirm Delete
          </h3>
          <p className="text-center font-bold text-black mb-10 leading-relaxed uppercase tracking-tight text-sm">
            Are you sure you want to delete <br />
            <span className="bg-neo-pink px-2">"{title}"</span>? <br />
            This action is permanent.
          </p>

          <div className="flex gap-4 w-full">
            <Button
              variants="secondary"
              innertext="Cancel"
              onClick={onClose}
              className="flex-1"
            />
            <Button
              variants="danger"
              innertext="Delete"
              onClick={onConfirm}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
