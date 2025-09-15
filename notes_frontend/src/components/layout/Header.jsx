import React from 'react';

/**
 * PUBLIC_INTERFACE
 * Header component containing branding, search, and quick actions.
 */
function Header({ theme, onToggleTheme, onCreate, searchQuery, onSearchChange, onClearFilters }) {
  return (
    <header className="header">
      <div className="header-inner">
        <div className="brand" aria-label="Application branding">
          <div className="brand-badge" aria-hidden />
          <div className="brand-title">Personal Notes Organizer</div>
          <span className="badge" title="Ocean Professional theme">
            Ocean Professional
          </span>
        </div>

        <input
          className="input"
          type="search"
          placeholder="Search notes..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          aria-label="Search notes"
        />

        <div className="header-actions">
          <button
            className="btn"
            onClick={onClearFilters}
            aria-label="Clear filters"
            title="Clear active filters"
          >
            Clear
          </button>
          <button
            className="btn btn-primary"
            onClick={onCreate}
            aria-label="Create new note"
            title="Create a new note"
          >
            + New Note
          </button>
          <button
            className="btn btn-ghost"
            onClick={onToggleTheme}
            aria-label={`Toggle theme to ${theme === 'light' ? 'dark' : 'light'}`}
            title="Toggle light/dark theme"
          >
            {theme === 'light' ? '🌙' : '☀️'}
          </button>
        </div>
      </div>
    </header>
  );
}

export default Header;
