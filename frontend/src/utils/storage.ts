export const loadFromStorage = <T>(key: string, fallback: T): T => {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

export const saveToStorage = <T>(key: string, value: T) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore storage errors on older browsers or private mode
  }
};

export const removeFromStorage = (key: string) => {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // ignore storage errors on older browsers or private mode
  }
};
