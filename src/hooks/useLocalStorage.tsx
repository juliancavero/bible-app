export enum LocalStorageKeys {
  FAV_CHAPTERS = "fav_chapters",
  FAV_SAINTS = "fav_saints",
  CONTINUE_READING = "continue_reading",
  STORED_QUESTIONS = "stored_questions",
  ACHIEVEMENTS = "achievements",
  PREFERENCES = "preferences",
  BIBLE_VERSION = "bible_version",
}

const useLocalStorage = () => {
  const getItem = (key: LocalStorageKeys) => {
    const value = window.localStorage.getItem(key);
    if (!value) return null;
    return JSON.parse(value);
  };

  const setItem = (key: LocalStorageKeys, value: Object) => {
    window.localStorage.setItem(key, JSON.stringify(value));
  };

  const deleteItem = (key: LocalStorageKeys) => {
    window.localStorage.removeItem(key);
  };

  return {
    getItem,
    setItem,
    deleteItem,
  };
};

export default useLocalStorage;
