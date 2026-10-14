import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  ArrowRight,
  ExternalLink,
  Copy,
  Check,
  CornerDownLeft,
  Terminal,
  Compass,
  FileCode,
  MapPin,
  Camera,
  User,
  Mail,
  Layers,
} from 'lucide-react';
import { commandPaletteItems } from '../../data/portfolioData';
import './CommandPalette.css';

// Helper to pick contextual icons for palette items
function getItemIcon(item) {
  if (item.action === 'copy') return <Copy size={15} />;
  if (item.action === 'email') return <Mail size={15} />;
  if (item.external) return <ExternalLink size={15} />;

  switch (item.id) {
    case 'nav-home':
      return <Terminal size={15} />;
    case 'nav-tech-stack':
      return <FileCode size={15} />;
    case 'nav-dht':
      return <Layers size={15} />;
    case 'nav-travel':
      return <MapPin size={15} />;
    case 'nav-photo-video':
      return <Camera size={15} />;
    case 'nav-about':
      return <User size={15} />;
    case 'nav-contact':
      return <Mail size={15} />;
    default:
      return <Compass size={15} />;
  }
}

const CommandPalette = ({ open: controlledOpen, isOpen: controlledIsOpen, onClose }) => {
  const navigate = useNavigate();
  const [internalOpen, setInternalOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [copiedId, setCopiedId] = useState(null);

  const inputRef = useRef(null);
  const listRef = useRef(null);
  const itemRefs = useRef([]);

  // Support either `open` or `isOpen` prop, or internal keyboard toggling
  const isControlled = controlledOpen !== undefined || controlledIsOpen !== undefined;
  const isVisible = isControlled
    ? (controlledOpen !== undefined ? Boolean(controlledOpen) : Boolean(controlledIsOpen))
    : internalOpen;

  const handleClose = useCallback(() => {
    if (isControlled) {
      onClose?.();
    } else {
      setInternalOpen(false);
    }
    setQuery('');
    setSelectedIndex(0);
  }, [isControlled, onClose]);

  // Global keyboard shortcut trigger (⌘K / Ctrl+K) and Escape
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && (e.key === 'k' || e.key === 'K');
      if (isCmdK && !isControlled) {
        e.preventDefault();
        setInternalOpen((prev) => !prev);
      }

      if (e.key === 'Escape' && isVisible) {
        e.preventDefault();
        handleClose();
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [isVisible, isControlled, handleClose]);

  // Lock body scroll and focus search input on open
  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
      // Fast autofocus without layout thrashing
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 10);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = '';
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isVisible]);

  // Filter items matching query
  const filteredCategories = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commandPaletteItems;

    return commandPaletteItems
      .map((cat) => {
        const matchingItems = cat.items.filter((item) => {
          const matchLabel = item.label?.toLowerCase().includes(q);
          const matchDesc = item.description?.toLowerCase().includes(q);
          const matchPath = item.path?.toLowerCase().includes(q);
          const matchUrl = item.url?.toLowerCase().includes(q);
          const matchId = item.id?.toLowerCase().includes(q);
          const matchCat = cat.category?.toLowerCase().includes(q);
          const matchAction = item.action?.toLowerCase().includes(q);
          const matchShortcut = item.shortcut?.toLowerCase() === q;

          // Acronym matching (e.g. "dht" -> "Discover Himalayan Trails")
          const acronym = item.label
            ?.split(/[\s-]+/)
            .map((w) => w[0])
            .join('')
            .toLowerCase();
          const matchAcronym = acronym?.includes(q);

          return (
            matchLabel ||
            matchDesc ||
            matchPath ||
            matchUrl ||
            matchId ||
            matchCat ||
            matchAction ||
            matchShortcut ||
            matchAcronym
          );
        });

        return {
          ...cat,
          items: matchingItems,
        };
      })
      .filter((cat) => cat.items.length > 0);
  }, [query]);

  // Flattened list for linear keyboard indexing
  const flatItems = useMemo(() => {
    return filteredCategories.flatMap((cat) =>
      cat.items.map((item) => ({ ...item, categoryName: cat.category }))
    );
  }, [filteredCategories]);

  // Derive safe activeIndex without setting state in an effect
  const activeIndex = flatItems.length === 0 ? 0 : Math.min(selectedIndex, flatItems.length - 1);

  // Ensure active element scrolls into view
  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      itemRefs.current[activeIndex].scrollIntoView({
        block: 'nearest',
      });
    }
  }, [activeIndex]);

  // Execute item action
  const executeItem = useCallback(
    (item) => {
      if (!item) return;

      if (
        item.action === 'copy' ||
        item.id === 'act-copy-email' ||
        item.id === 'copy-email' ||
        item.action === 'copy-email'
      ) {
        const textToCopy = item.value || 'ashishnirankari0968@gmail.com';
        if (navigator.clipboard?.writeText) {
          navigator.clipboard.writeText(textToCopy);
        }
        setCopiedId(item.id);
        setTimeout(() => {
          setCopiedId(null);
          handleClose();
        }, 900);
        return;
      }

      if (item.action === 'email' || item.id === 'act-email') {
        const mailUrl = item.url || 'mailto:ashishnirankari0968@gmail.com';
        window.location.href = mailUrl;
        handleClose();
        return;
      }

      if (item.external && item.url) {
        window.open(item.url, '_blank', 'noopener,noreferrer');
        handleClose();
        return;
      }

      if (item.path) {
        navigate(item.path);
        handleClose();
      }
    },
    [navigate, handleClose]
  );

  // Keyboard navigation within the palette
  const handleKeyDown = (e) => {
    if (flatItems.length === 0) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % flatItems.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const currentItem = flatItems[activeIndex];
      if (currentItem) {
        executeItem(currentItem);
      }
    }
  };

  if (!isVisible) return null;

  let flatIndexCounter = -1;

  return createPortal(
    <div
      className="cmd-palette-backdrop"
      onClick={handleClose}
      role="presentation"
    >
      <div
        className="cmd-palette-modal"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-label="Spaceship Orbital Command Palette"
      >
        {/* Search Header */}
        <div className="cmd-palette-header">
          <Search size={18} className="cmd-search-icon" aria-hidden="true" />
          <input
            ref={inputRef}
            type="text"
            className="cmd-search-input"
            placeholder="Type a command, route, or destination..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            aria-autocomplete="list"
            aria-controls="cmd-palette-list"
          />
          {query && (
            <button
              type="button"
              className="cmd-clear-btn"
              onClick={() => {
                setQuery('');
                inputRef.current?.focus();
              }}
              aria-label="Clear search input"
            >
              Clear
            </button>
          )}
        </div>

        {/* Results List */}
        <div
          ref={listRef}
          id="cmd-palette-list"
          className="cmd-palette-list"
          role="listbox"
        >
          {filteredCategories.length === 0 ? (
            <div className="cmd-empty-state">
              <span className="telemetry-tag">
                <span className="telemetry-dot" aria-hidden="true"></span>
                TRANSMISSION UNRESOLVED
              </span>
              <p className="cmd-empty-title">No matching coordinates or actions</p>
              <p className="cmd-empty-hint">Try searching for "Tech", "DHT", "Patalsu", or "Email"</p>
            </div>
          ) : (
            filteredCategories.map((category) => (
              <div key={category.category} className="cmd-category-group">
                <div className="cmd-category-label">
                  <span>{category.category}</span>
                </div>
                <div className="cmd-items-group">
                  {category.items.map((item) => {
                    flatIndexCounter += 1;
                    const currentIndex = flatIndexCounter;
                    const isSelected = currentIndex === activeIndex;
                    const isCopied = copiedId === item.id;

                    return (
                      <div
                        key={item.id}
                        ref={(el) => {
                          itemRefs.current[currentIndex] = el;
                        }}
                        id={`cmd-item-${item.id}`}
                        className={`cmd-item ${isSelected ? 'is-selected' : ''}`}
                        role="option"
                        aria-selected={isSelected}
                        onClick={() => executeItem(item)}
                        onMouseEnter={() => setSelectedIndex(currentIndex)}
                      >
                        <div className="cmd-item-icon" aria-hidden="true">
                          {getItemIcon(item)}
                        </div>

                        <div className="cmd-item-text">
                          <div className="cmd-item-title-row">
                            <span className="cmd-item-label">{item.label}</span>
                            {isCopied && (
                              <span className="cmd-badge cmd-badge-success">
                                <Check size={11} />
                                <span>COPIED</span>
                              </span>
                            )}
                          </div>
                          {item.description && (
                            <span className="cmd-item-desc">{item.description}</span>
                          )}
                        </div>

                        <div className="cmd-item-meta" aria-hidden="true">
                          {item.shortcut ? (
                            <kbd className="cmd-kbd">{item.shortcut}</kbd>
                          ) : item.external ? (
                            <span className="cmd-type-tag">EXT</span>
                          ) : item.action ? (
                            <span className="cmd-type-tag">ACT</span>
                          ) : (
                            <ArrowRight size={13} className="cmd-arrow" />
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Telemetry Footer */}
        <div className="cmd-palette-footer">
          <div className="cmd-footer-shortcuts">
            <span className="cmd-footer-shortcut">
              <kbd className="cmd-footer-kbd">↑</kbd>
              <kbd className="cmd-footer-kbd">↓</kbd>
              <span>Navigate</span>
            </span>
            <span className="cmd-footer-shortcut">
              <kbd className="cmd-footer-kbd">
                <CornerDownLeft size={11} />
              </kbd>
              <span>Select</span>
            </span>
            <span className="cmd-footer-shortcut cmd-esc-badge">
              <kbd className="cmd-footer-kbd">ESC</kbd>
              <span>TO CLOSE</span>
            </span>
          </div>

          <div className="cmd-footer-telemetry">
            <span className="telemetry-tag">
              <span className="telemetry-dot" aria-hidden="true"></span>
              <span>32.2396° N, 77.1887° E</span>
            </span>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default CommandPalette;
