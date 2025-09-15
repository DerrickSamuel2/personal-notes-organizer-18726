import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Single note card with title, content preview, tags, and actions.
 */
function NoteCard({ note, onEdit, onDelete }) {
  const formattedDate = new Date(note.updatedAt || note.createdAt).toLocaleString();

  return (
    <article className="note-card" aria-label={`Note titled ${note.title || 'Untitled'}`}>
      <header>
        <div className="note-title">{note.title || 'Untitled'}</div>
        <div className="helper">Updated {formattedDate}</div>
      </header>
      <div className="note-meta">
        {note.tags?.map((t) => (
          <span key={t} className="tag" aria-label={`Tag ${t}`} title={t}>
            <span className="dot" aria-hidden />
            {t}
          </span>
        ))}
      </div>
      <div className="note-body">
        {note.content?.length ? note.content : <span className="helper">No content</span>}
      </div>
      <div className="note-actions">
        <button className="btn" onClick={onEdit} aria-label="Edit note">Edit</button>
        <button
          className="btn"
          onClick={onDelete}
          aria-label="Delete note"
          style={{ color: 'var(--color-error)', borderColor: 'var(--color-error)' }}
        >
          Delete
        </button>
      </div>
    </article>
  );
}

export default NoteCard;
