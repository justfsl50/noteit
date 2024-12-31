import React, { useState, useEffect } from 'react';
import { NoteCard } from './components/NoteCard';
import { ThemeToggle } from './components/ThemeToggle';
import { AddNoteButton } from './components/AddNoteButton';
import { getRandomColor } from './utils/colors';

interface Note {
  id: string;
  content: string;
  color: 'yellow' | 'blue' | 'green' | 'pink';
  createdAt: string;
}

function App() {
  const [notes, setNotes] = useState<Note[]>(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  
  const [isDark, setIsDark] = useState(() => {
    if (typeof window !== 'undefined') {
      return document.documentElement.classList.contains('dark');
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const addNote = () => {
    const newNote = {
      id: crypto.randomUUID(),
      content: '',
      color: getRandomColor(),
      createdAt: new Date().toISOString(),
    };
    setNotes(prev => [newNote, ...prev]);
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(note => note.id !== id));
  };

  const updateNote = (id: string, content: string) => {
    setNotes(prev => prev.map(note => 
      note.id === id ? { ...note, content } : note
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 to-black dark:from-black dark:to-gray-950 transition-colors duration-200">
      <div className="container mx-auto px-4 py-12">
        <ThemeToggle isDark={isDark} onToggle={() => setIsDark(!isDark)} />
        
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-12 text-center">
          My Notes
        </h1>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <AddNoteButton onClick={addNote} />
          {notes.map(note => (
            <NoteCard
              key={note.id}
              id={note.id}
              content={note.content}
              color={note.color}
              createdAt={note.createdAt}
              onDelete={deleteNote}
              onUpdate={updateNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;