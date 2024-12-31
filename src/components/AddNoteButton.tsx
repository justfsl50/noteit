import React from 'react';
import { Plus } from 'lucide-react';

interface AddNoteButtonProps {
  onClick: () => void;
}

export function AddNoteButton({ onClick }: AddNoteButtonProps) {
  return (
    <button
      onClick={onClick}
      className="relative group h-full min-h-[200px] w-full rounded-xl
                 bg-white/50 dark:bg-white/10 backdrop-blur-sm
                 border-2 border-dashed border-gray-300/50 dark:border-gray-600/30
                 hover:border-blue-400/50 dark:hover:border-blue-400/30
                 transition-all duration-300 hover:scale-[1.02]
                 shadow-lg hover:shadow-xl"
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="transform group-hover:scale-110 transition-transform duration-300">
          <Plus className="text-gray-400/80 dark:text-gray-500/80 group-hover:text-blue-500/80" size={24} />
        </div>
      </div>
    </button>
  );
}