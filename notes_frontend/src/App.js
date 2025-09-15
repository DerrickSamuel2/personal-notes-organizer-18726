import React, { useMemo, useState } from 'react';
import './App.css';
import './index.css';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import NotesBoard from './components/notes/NotesBoard';
import NoteEditorModal from './components/notes/NoteEditorModal';
import { useNotes } from './hooks/useNotes';
import { useLocalStorage } from './hooks/useLocalStorage';
import { ApiClient } from './utils/api';

// PUBLIC_INTERFACE
function App() {
  /** Root application for the Personal Notes Organizer. Provides layout and orchestrates notes state. */
  const api = useMemo(() => new ApiClient(), []);
  const { notes, tags, filteredNotes, addNote, updateNote, deleteNote, addTag, toggleTagFilter, activeTagFilters, searchQuery, setSearchQuery, clearFilters } =
    useNotes(api);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [theme, setTheme] = useLocalStorage('theme', 'light');

  const openCreate = () => {
    setEditingNote(null);
    setIsEditorOpen(true);
  };

  const openEdit = (note) => {
    setEditingNote(note);
    setIsEditorOpen(true);
  };

  const closeEditor = () => {
    setEditingNote(null);
    setIsEditorOpen(false);
  };

  // PUBLIC_INTERFACE
  const handleSave = (data) => {
    if (editingNote) {
      updateNote(editingNote.id, data);
    } else {
      addNote(data);
    }
    closeEditor();
  };

  // PUBLIC_INTERFACE
  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  return (
    <div className={`app-root theme-${theme}`} data-theme={theme}>
      <Header
        theme={theme}
        onToggleTheme={toggleTheme}
        onCreate={openCreate}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onClearFilters={clearFilters}
      />
      <div className="app-shell">
        <Sidebar
          tags={tags}
          activeTagFilters={activeTagFilters}
          onToggleTag={toggleTagFilter}
          onAddTag={addTag}
        />
        <main className="main-content">
          <NotesBoard
            notes={filteredNotes}
            onEdit={openEdit}
            onDelete={deleteNote}
          />
        </main>
      </div>

      <NoteEditorModal
        open={isEditorOpen}
        note={editingNote}
        availableTags={tags}
        onClose={closeEditor}
        onSave={handleSave}
      />
    </div>
  );
}

export default App;
