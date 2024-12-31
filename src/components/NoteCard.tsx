import React from 'react';
import { Trash2 } from 'lucide-react';
import { cn } from '../utils/cn';
import { EditableContent } from './EditableContent';
import { formatDateTime } from '../utils/date';

interface NoteCardProps {
  id: string;
  content: string;
  createdAt: string;
  onDelete: (id: string) => void;
  onUpdate: (id: string, content: string) => void;
  color?: 'yellow' | 'blue' | 'green' | 'pink';
}

const colorVariants = {
  yellow: 'from-yellow-200/80 to-yellow-100/50 shadow-yellow-200/30',
  blue: 'from-blue-200/80 to-blue-100/50 shadow-blue-200/30',
  green: 'from-green-200/80 to-green-100/50 shadow-green-200/30',
  pink: 'from-pink-200/80 to-pink-100/50 shadow-pink-200/30',
};

export function NoteCard({ id, content, createdAt, onDelete, onUpdate, color = 'yellow' }: NoteCardProps) {
  return (
    <div 
      className={cn(
        "group relative p-6 min-h-[200px] break-words",
        "bg-gradient-to-br backdrop-blur-sm",
        "rounded-xl border border-white/20",
        "transform transition-all duration-300",
        "hover:scale-[1.02] hover:-rotate-1",
        "shadow-lg hover:shadow-xl",
        colorVariants[color]
      )}
    >
      <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-all duration-300 scale-90 group-hover:scale-100">
        <button
          onClick={() => onDelete(id)}
          className="p-2 rounded-full bg-white/80 hover:bg-red-50 text-red-500 shadow-lg backdrop-blur-sm
                   transform hover:scale-110 transition-all duration-200"
          aria-label="Delete note"
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="relative">
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-2 bg-white/40 rounded-full shadow-inner" />
        
        <EditableContent 
          content={content} 
          onSave={(newContent) => onUpdate(id, newContent)} 
        />
        
        <div className="mt-6 pt-4 border-t border-white/20 flex items-center justify-between text-xs">
          <span className="text-gray-600/80 dark:text-gray-400/80 font-medium">
            {formatDateTime(createdAt)}
          </span>
          <span className="text-gray-500/60 dark:text-gray-400/60 italic">
            Double-click to edit
          </span>
        </div>
      </div>
    </div>
  );
}