const STORAGE_KEY = "mathgpt_tooltip_position";

export interface Position {
  x: number;
  y: number;
}

const isChromeStorageAvailable = (): boolean => {
  return typeof chrome !== "undefined" && !!chrome.storage?.local;
};

export const savePosition = (position: Position): Promise<void> => {
  return new Promise((resolve) => {
    if (isChromeStorageAvailable()) {
      chrome.storage.local.set({ [STORAGE_KEY]: position }, resolve);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(position));
      resolve();
    }
  });
};

export const loadPosition = (): Promise<Position | null> => {
  return new Promise((resolve) => {
    if (isChromeStorageAvailable()) {
      chrome.storage.local.get([STORAGE_KEY], (result) => {
        resolve(result[STORAGE_KEY] || null);
      });
    } else {
      const saved = localStorage.getItem(STORAGE_KEY);
      resolve(saved ? JSON.parse(saved) : null);
    }
  });
};
