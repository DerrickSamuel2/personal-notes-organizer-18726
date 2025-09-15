import React, { useState } from 'react';

/**
 * PUBLIC_INTERFACE
 * Sidebar for tag filters and tag management.
 */
function Sidebar({ tags, activeTagFilters, onToggleTag, onAddTag }) {
  const [tagInput, setTagInput] = useState('');

  const handleAdd = () => {
    const clean = tagInput.trim();
    if (!clean) return;
    onAddTag(clean);
    setTagInput('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd();
    }
  };

  return (
    <aside className="sidebar" aria-label="Sidebar with tags and filters">
      <div className="sidebar-title">Tags & Filters</div>
      <div className="tag-list" role="list">
        {tags.length === 0 ? (
          <span className="helper">No tags yet. Add one below to organize your notes.</span>
        ) : (
          tags.map((t) => {
            const active = activeTagFilters.includes(t);
            return (
              <button
                key={t}
                role="listitem"
                className={`tag ${active ? 'active' : ''}`}
                onClick={() => onToggleTag(t)}
                aria-pressed={active}
                aria-label={`Filter by tag ${t}`}
                title={active ? 'Click to disable this filter' : 'Click to filter by this tag'}
              >
                <span className="dot" aria-hidden />
                {t}
              </button>
            );
          })
        )}
      </div>

      <div className="sidebar-divider" role="separator" />

      <div className="sidebar-title">Add Tag</div>
      <div className="tag-add">
        <input
          className="input"
          placeholder="e.g. Work, Personal"
          value={tagInput}
          onChange={(e) => setTagInput(e.target.value)}
          onKeyDown={handleKey}
          aria-label="New tag name"
        />
        <button className="btn" onClick={handleAdd} aria-label="Add tag">Add</button>
      </div>
    </aside>
  );
}

export default Sidebar;
