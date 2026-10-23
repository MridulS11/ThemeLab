import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SavedListItem, useMyList } from '../context/MyListContext';
import { downloadMyListAsPdf } from '../utils/pdfGenerator';

interface ListItemRowProps {
  item: SavedListItem;
}

const ListItemRow: React.FC<ListItemRowProps> = ({ item }) => {
  const navigate = useNavigate();
  const { removeItem, updateItemComment } = useMyList();
  const [isEditingComment, setIsEditingComment] = useState(false);
  const [draftComment, setDraftComment] = useState(item.comment);

  const hasSavedComment = item.comment.trim().length > 0;

  const handleOpenEditor = () => {
    setDraftComment(item.comment);
    setIsEditingComment(true);
  };

  const handleSaveComment = (e: React.FormEvent) => {
    e.preventDefault();
    updateItemComment(item.uid, draftComment);
    setIsEditingComment(false);
  };

  const handleCancelComment = () => {
    setDraftComment(item.comment);
    setIsEditingComment(false);
  };

  const handleClearComment = () => {
    updateItemComment(item.uid, '');
    setDraftComment('');
    setIsEditingComment(false);
  };

  return (
    <li className="mylist-item-card" data-item-uid={item.uid}>
      <div className="mylist-item-main">
        <div className="mylist-item-info">
          <span className="mylist-item-name">{item.name}</span>
          {item.category && <span className="mylist-item-category">{item.category}</span>}
        </div>

        <div className="mylist-item-actions">
          <button
            type="button"
            className="mylist-action-btn"
            onClick={handleOpenEditor}
            aria-expanded={isEditingComment}
          >
            {hasSavedComment ? 'Edit Comment' : 'Add Comment'}
          </button>

          <button
            type="button"
            className="mylist-action-btn mylist-view-btn"
            onClick={() => navigate(item.route)}
          >
            View Item →
          </button>

          <button
            type="button"
            className="mylist-remove-btn"
            onClick={() => removeItem(item.uid)}
            aria-label={`Remove ${item.name} from list`}
            title={`Remove ${item.name} from list`}
          >
            <svg
              width="15"
              height="15"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
              <path d="M10 11v6" />
              <path d="M14 11v6" />
              <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Saved Comment Display */}
      {!isEditingComment && hasSavedComment && (
        <div className="mylist-saved-comment">
          <p className="mylist-saved-comment-text">“{item.comment}”</p>
          <button
            type="button"
            className="mylist-comment-delete-inline"
            onClick={handleClearComment}
            aria-label={`Delete comment for ${item.name}`}
          >
            Clear comment
          </button>
        </div>
      )}

      {/* Inline Comment Editor */}
      {isEditingComment && (
        <form className="mylist-comment-editor" onSubmit={handleSaveComment}>
          <label htmlFor={`comment-input-${item.uid}`} className="mylist-sr-only">
            Comment for {item.name}
          </label>
          <textarea
            id={`comment-input-${item.uid}`}
            className="mylist-comment-textarea"
            rows={2}
            placeholder={`Add a note for ${item.name} (e.g. "Use this for the portfolio hero")...`}
            value={draftComment}
            onChange={(e) => setDraftComment(e.target.value)}
            autoFocus
          />
          <div className="mylist-comment-editor-actions">
            <button type="submit" className="mylist-editor-save-btn">
              Save
            </button>
            <button
              type="button"
              className="mylist-editor-cancel-btn"
              onClick={handleCancelComment}
            >
              Cancel
            </button>
            {hasSavedComment && (
              <button
                type="button"
                className="mylist-editor-clear-btn"
                onClick={handleClearComment}
              >
                Delete Comment
              </button>
            )}
          </div>
        </form>
      )}
    </li>
  );
};

export const MyListPage: React.FC = () => {
  const {
    title,
    description,
    isDescriptionOpen,
    themeItems,
    animationItems,
    totalCount,
    setTitle,
    setDescription,
    setIsDescriptionOpen,
    removeDescription,
    clearList,
  } = useMyList();

  const [confirmingClear, setConfirmingClear] = useState(false);
  const [pdfFeedback, setPdfFeedback] = useState<string | null>(null);

  const handleDownloadPdf = () => {
    if (totalCount === 0) return;
    const filename = downloadMyListAsPdf({
      title,
      description,
      themeItems,
      animationItems,
      origin: window.location.origin,
    });
    setPdfFeedback(`Downloaded "${filename}"`);
    window.setTimeout(() => {
      setPdfFeedback(null);
    }, 3500);
  };

  const handleConfirmClear = () => {
    clearList();
    setConfirmingClear(false);
  };

  return (
    <section className="mylist-section" aria-labelledby="mylist-heading">
      <div className="mylist-header-block">
        <span id="mylist-heading" className="mylist-kicker">
          Personal Reference Collection ({totalCount} {totalCount === 1 ? 'Item' : 'Items'})
        </span>

        {/* A. List Title Field */}
        <div className="mylist-title-wrap">
          <label htmlFor="mylist-title-input" className="mylist-sr-only">
            List Title
          </label>
          <input
            id="mylist-title-input"
            type="text"
            className="mylist-title-input"
            placeholder="Add a title to your list…"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
      </div>

      {/* B. List Contents or Empty State */}
      {totalCount === 0 ? (
        <div className="mylist-empty-state" role="status">
          <h2 className="mylist-empty-title">Your list is empty.</h2>
          <p className="mylist-empty-sub">
            Explore themes and animations, then add your favourites here.
          </p>
          <div className="mylist-empty-links">
            <Link to="/themes" className="mylist-explore-btn">
              Explore Themes
            </Link>
            <Link to="/animations" className="mylist-explore-btn">
              Explore Animations
            </Link>
          </div>
        </div>
      ) : (
        <div className="mylist-categories-container">
          {themeItems.length > 0 && (
            <div className="mylist-category-group" aria-labelledby="mylist-themes-heading">
              <h2 id="mylist-themes-heading" className="mylist-category-heading">
                ~ Themes ~
              </h2>
              <ul className="mylist-items-list">
                {themeItems.map((item) => (
                  <ListItemRow key={item.uid} item={item} />
                ))}
              </ul>
            </div>
          )}

          {animationItems.length > 0 && (
            <div className="mylist-category-group" aria-labelledby="mylist-animations-heading">
              <h2 id="mylist-animations-heading" className="mylist-category-heading">
                ~ Animations / Effects ~
              </h2>
              <ul className="mylist-items-list">
                {animationItems.map((item) => (
                  <ListItemRow key={item.uid} item={item} />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* Lower Controls: Add Description -> Clear List -> Download List */}
      <div className="mylist-footer-controls">
        <div className="mylist-description-wrap">
          {!isDescriptionOpen && !description.trim() ? (
            <button
              type="button"
              className="mylist-add-desc-btn"
              onClick={() => setIsDescriptionOpen(true)}
            >
              + Add description
            </button>
          ) : (
            <div className="mylist-desc-editor-box">
              <label htmlFor="mylist-description-input" className="mylist-sr-only">
                List Description
              </label>
              <textarea
                id="mylist-description-input"
                className="mylist-description-textarea"
                rows={2}
                placeholder="Write a brief description of the purpose of your list…"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <div className="mylist-desc-actions">
                <button
                  type="button"
                  className="mylist-desc-remove-btn"
                  onClick={removeDescription}
                >
                  Remove description
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mylist-clear-zone">
          {!confirmingClear ? (
            <button
              type="button"
              className="mylist-clear-btn"
              onClick={() => setConfirmingClear(true)}
              disabled={totalCount === 0 && !title.trim() && !description.trim()}
              aria-disabled={totalCount === 0 && !title.trim() && !description.trim()}
            >
              Clear List
            </button>
          ) : (
            <div
              className="mylist-clear-confirm-box"
              role="alertdialog"
              aria-labelledby="clear-confirm-title"
              aria-describedby="clear-confirm-desc"
            >
              <strong id="clear-confirm-title">Clear your entire list?</strong>
              <p id="clear-confirm-desc">
                All saved themes, animations/effects, comments, title, and description will be
                permanently removed.
              </p>
              <div className="mylist-clear-confirm-actions">
                <button
                  type="button"
                  className="mylist-confirm-yes-btn"
                  onClick={handleConfirmClear}
                >
                  Yes, Clear Everything
                </button>
                <button
                  type="button"
                  className="mylist-confirm-cancel-btn"
                  onClick={() => setConfirmingClear(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mylist-download-zone">
          <button
            type="button"
            className="mylist-download-pdf-btn"
            onClick={handleDownloadPdf}
            disabled={totalCount === 0}
            aria-disabled={totalCount === 0}
          >
            Download List
          </button>
          {totalCount === 0 && (
            <span className="mylist-download-hint">
              Add at least one theme or animation to enable PDF export.
            </span>
          )}
          {pdfFeedback && (
            <span className="mylist-pdf-feedback" role="status">
              ✓ {pdfFeedback}
            </span>
          )}
        </div>
      </div>
    </section>
  );
};
