import React, { useState, useRef, useEffect } from 'react';
import { createAutoSave } from '../utils/autoSave';

interface EditableContentProps {
  content: string;
  onSave: (newContent: string) => void;
}

const MAX_CHARS = 1000;

export function EditableContent({ content, onSave }: EditableContentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(content);
  const [charCount, setCharCount] = useState(content.length);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const autoSave = createAutoSave(onSave);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing]);

  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (editedContent.trim() !== '') {
      onSave(editedContent);
    } else {
      setEditedContent(content);
    }
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Allow common keyboard shortcuts
    if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
      e.preventDefault();
      wrapSelection('**');
    }
    if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
      e.preventDefault();
      wrapSelection('*');
    }
    
    if (e.key === 'Enter' && e.shiftKey) {
      return; // Allow line breaks with Shift+Enter
    }
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleBlur();
    }
    if (e.key === 'Escape') {
      setEditedContent(content);
      setIsEditing(false);
    }
  };

  const wrapSelection = (wrapper: string) => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selection = editedContent.substring(start, end);
    const newContent = 
      editedContent.substring(0, start) +
      `${wrapper}${selection}${wrapper}` +
      editedContent.substring(end);

    setEditedContent(newContent);
    autoSave(newContent);
  };

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newContent = e.target.value;
    if (newContent.length <= MAX_CHARS) {
      setEditedContent(newContent);
      setCharCount(newContent.length);
      autoSave(newContent);
      
      e.target.style.height = 'auto';
      e.target.style.height = `${e.target.scrollHeight}px`;
    }
  };

  const formatToolbar = (
    <div className="flex gap-2 mb-2">
      <button
        onClick={() => wrapSelection('**')}
        className="p-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        title="Bold (Ctrl+B)"
      >
        B
      </button>
      <button
        onClick={() => wrapSelection('*')}
        className="p-1 text-sm rounded hover:bg-gray-200 dark:hover:bg-gray-700"
        title="Italic (Ctrl+I)"
      >
        I
      </button>
      <div className="ml-auto text-sm text-gray-500">
        {charCount}/{MAX_CHARS}
      </div>
    </div>
  );

  if (isEditing) {
    return (
      <div>
        {formatToolbar}
        <textarea
          ref={textareaRef}
          value={editedContent}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          className="w-full h-full bg-transparent resize-none outline-none text-gray-800 font-medium min-h-[100px]"
          placeholder="Enter your note... (supports markdown)"
        />
      </div>
    );
  }

  return (
    <p 
      onDoubleClick={handleDoubleClick}
      className="text-gray-800 whitespace-pre-wrap cursor-text"
    >
      {content || 'Double-click to edit'}
    </p>
  );
}