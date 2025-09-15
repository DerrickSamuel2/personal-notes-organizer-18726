import React from 'react';
import NoteCard from './NoteCard';

/**
 * PUBLIC_INTERFACE
 * Grid/list board for notes display.
 */
function NotesBoard({ notes, onEdit, onDelete }) {
  return (
    <section aria-label="Notes list" className="board">
      {notes.length === 0 ? (
        <div className="note-card" style={{ gridColumn: 'span 12' }}>
          <div className="note-title">No notes found</div>
          <div className="note-body">Try creating a new note or clearing filters.</div>
        </div>
      ) : (
        notes.map((n) => (
          <NoteCard key={n.id} note={n} onEdit={() => onEdit(n)} onDelete={() => onDelete(n.id)} />
        ))
      )}
    </section>
  );
}

export default NotesBoard;
