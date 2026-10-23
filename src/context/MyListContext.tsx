/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { THEMES, ThemeId } from '../data/themes';
import { ANIMATION_DEMOS } from '../data/animations';

export type SavedItemType = 'theme' | 'animation' | 'effect';

export interface SavedListItem {
  uid: string;
  itemType: SavedItemType;
  id: string;
  name: string;
  category: string;
  route: string;
  comment: string;
  addedAt: string;
}

export interface MyListStorageSchema {
  version: 1;
  title: string;
  description: string;
  isDescriptionOpen: boolean;
  items: SavedListItem[];
}

interface MyListContextValue {
  title: string;
  description: string;
  isDescriptionOpen: boolean;
  items: SavedListItem[];
  themeItems: SavedListItem[];
  animationItems: SavedListItem[];
  totalCount: number;
  toastMessage: string | null;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
  setIsDescriptionOpen: (open: boolean) => void;
  removeDescription: () => void;
  isThemeInList: (themeId: ThemeId | string) => boolean;
  isAnimationInList: (animId: string) => boolean;
  toggleThemeInList: (themeId: ThemeId | string) => void;
  toggleAnimationInList: (animId: string) => void;
  removeItem: (uid: string) => void;
  updateItemComment: (uid: string, comment: string) => void;
  clearList: () => void;
  dismissToast: () => void;
}

const STORAGE_KEY = 'themelab_my_list_v1';

const DEFAULT_STATE: MyListStorageSchema = {
  version: 1,
  title: '',
  description: '',
  isDescriptionOpen: false,
  items: [],
};

function loadInitialState(): MyListStorageSchema {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw) as Partial<MyListStorageSchema>;
    if (!parsed || typeof parsed !== 'object' || !Array.isArray(parsed.items)) {
      return DEFAULT_STATE;
    }

    const validItems: SavedListItem[] = parsed.items
      .filter(
        (item): item is SavedListItem =>
          Boolean(
            item &&
              typeof item.uid === 'string' &&
              typeof item.id === 'string' &&
              typeof item.name === 'string' &&
              typeof item.route === 'string' &&
              (item.itemType === 'theme' ||
                item.itemType === 'animation' ||
                item.itemType === 'effect')
          )
      )
      .map((item) => ({
        ...item,
        category: typeof item.category === 'string' ? item.category : '',
        comment: typeof item.comment === 'string' ? item.comment : '',
        addedAt: typeof item.addedAt === 'string' ? item.addedAt : new Date().toISOString(),
      }));

    // Deduplicate by uid while preserving order
    const seen = new Set<string>();
    const dedupedItems = validItems.filter((item) => {
      if (seen.has(item.uid)) return false;
      seen.add(item.uid);
      return true;
    });

    const desc = typeof parsed.description === 'string' ? parsed.description : '';

    return {
      version: 1,
      title: typeof parsed.title === 'string' ? parsed.title : '',
      description: desc,
      isDescriptionOpen:
        typeof parsed.isDescriptionOpen === 'boolean'
          ? parsed.isDescriptionOpen
          : Boolean(desc.trim()),
      items: dedupedItems,
    };
  } catch {
    return DEFAULT_STATE;
  }
}

const MyListContext = createContext<MyListContextValue | undefined>(undefined);

export const MyListProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<MyListStorageSchema>(loadInitialState);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // Ignore storage quota or private-mode errors
    }
  }, [state]);

  const triggerToast = useCallback((msg: string) => {
    setToastMessage(msg);
  }, []);

  useEffect(() => {
    if (!toastMessage) return;
    const timer = window.setTimeout(() => {
      setToastMessage(null);
    }, 2600);
    return () => window.clearTimeout(timer);
  }, [toastMessage]);

  const dismissToast = useCallback(() => setToastMessage(null), []);

  const setTitle = useCallback((title: string) => {
    setState((prev) => ({ ...prev, title }));
  }, []);

  const setDescription = useCallback((description: string) => {
    setState((prev) => ({ ...prev, description }));
  }, []);

  const setIsDescriptionOpen = useCallback((isDescriptionOpen: boolean) => {
    setState((prev) => ({ ...prev, isDescriptionOpen }));
  }, []);

  const removeDescription = useCallback(() => {
    setState((prev) => ({ ...prev, description: '', isDescriptionOpen: false }));
  }, []);

  const isThemeInList = useCallback(
    (themeId: string) => {
      const uid = `theme:${themeId}`;
      return state.items.some((i) => i.uid === uid);
    },
    [state.items]
  );

  const isAnimationInList = useCallback(
    (animId: string) => {
      const uid = `anim:${animId}`;
      return state.items.some((i) => i.uid === uid);
    },
    [state.items]
  );

  const toggleThemeInList = useCallback((themeId: string) => {
    const theme = THEMES.find((t) => t.id === themeId);
    if (!theme) return;
    const uid = `theme:${theme.id}`;

    setState((prev) => {
      const exists = prev.items.some((i) => i.uid === uid);
      if (exists) {
        triggerToast(`Removed "${theme.name}" from My List.`);
        return {
          ...prev,
          items: prev.items.filter((i) => i.uid !== uid),
        };
      } else {
        triggerToast(`Added "${theme.name}" to My List.`);
        const newItem: SavedListItem = {
          uid,
          itemType: 'theme',
          id: theme.id,
          name: theme.name,
          category: theme.group,
          route: `/themes/${theme.id}`,
          comment: '',
          addedAt: new Date().toISOString(),
        };
        return {
          ...prev,
          items: [...prev.items, newItem],
        };
      }
    });
  }, [triggerToast]);

  const toggleAnimationInList = useCallback((animId: string) => {
    const demo = ANIMATION_DEMOS.find((d) => d.id === animId);
    if (!demo) return;
    const uid = `anim:${demo.id}`;
    const itemType: SavedItemType =
      demo.category === 'visual-effects' ? 'effect' : 'animation';

    setState((prev) => {
      const exists = prev.items.some((i) => i.uid === uid);
      if (exists) {
        triggerToast(`Removed "${demo.name}" from My List.`);
        return {
          ...prev,
          items: prev.items.filter((i) => i.uid !== uid),
        };
      } else {
        triggerToast(`Added "${demo.name}" to My List.`);
        const newItem: SavedListItem = {
          uid,
          itemType,
          id: demo.id,
          name: demo.name,
          category: demo.categoryLabel,
          route: `/animations?item=${demo.id}`,
          comment: '',
          addedAt: new Date().toISOString(),
        };
        return {
          ...prev,
          items: [...prev.items, newItem],
        };
      }
    });
  }, [triggerToast]);

  const removeItem = useCallback((uid: string) => {
    setState((prev) => {
      const target = prev.items.find((i) => i.uid === uid);
      if (target) {
        triggerToast(`Removed "${target.name}" from My List.`);
      }
      return {
        ...prev,
        items: prev.items.filter((i) => i.uid !== uid),
      };
    });
  }, [triggerToast]);

  const updateItemComment = useCallback((uid: string, comment: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.map((item) =>
        item.uid === uid ? { ...item, comment: comment.trim() } : item
      ),
    }));
  }, []);

  const clearList = useCallback(() => {
    setState(DEFAULT_STATE);
    triggerToast('Cleared My List.');
  }, [triggerToast]);

  const themeItems = state.items.filter((i) => i.itemType === 'theme');
  const animationItems = state.items.filter(
    (i) => i.itemType === 'animation' || i.itemType === 'effect'
  );

  return (
    <MyListContext.Provider
      value={{
        title: state.title,
        description: state.description,
        isDescriptionOpen: state.isDescriptionOpen,
        items: state.items,
        themeItems,
        animationItems,
        totalCount: state.items.length,
        toastMessage,
        setTitle,
        setDescription,
        setIsDescriptionOpen,
        removeDescription,
        isThemeInList,
        isAnimationInList,
        toggleThemeInList,
        toggleAnimationInList,
        removeItem,
        updateItemComment,
        clearList,
        dismissToast,
      }}
    >
      {children}
    </MyListContext.Provider>
  );
};

export function useMyList(): MyListContextValue {
  const ctx = useContext(MyListContext);
  if (!ctx) {
    throw new Error('useMyList must be used within a MyListProvider');
  }
  return ctx;
}
