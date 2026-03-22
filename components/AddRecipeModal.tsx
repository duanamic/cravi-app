"use client";

import { useState } from "react";

interface AddRecipeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (url: string) => void;
}

export function AddRecipeModal({ isOpen, onClose, onSubmit }: AddRecipeModalProps) {
  const [url, setUrl] = useState("");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-w-lg p-6">
        <h2 className="font-display text-xl text-craviText mb-4">Add Recipe</h2>
        <input
          type="url"
          placeholder="Paste Instagram or TikTok URL..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          className="w-full border border-craviBorder rounded-lg px-4 py-3 font-body text-craviText focus:outline-none focus:border-craviGreen"
        />
        <div className="flex gap-3 mt-4">
          <button onClick={onClose} className="flex-1 py-3 rounded-lg border border-craviBorder text-craviSecondary font-body">
            Cancel
          </button>
          <button
            onClick={() => { onSubmit(url); setUrl(""); }}
            className="flex-1 py-3 rounded-lg bg-craviGreen text-white font-body"
          >
            Import
          </button>
        </div>
      </div>
    </div>
  );
}
