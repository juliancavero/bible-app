import useLocalStorage, { LocalStorageKeys } from "@/hooks/useLocalStorage";
import {
  BibleBookType,
  FavouriteChapterContextType,
  FavouriteChapterType,
} from "@/types/bible";
import { ProviderProps } from "@/types/common";
import { Saint } from "@/types/saints";
import { createContext, useContext, useEffect, useState } from "react";

const initialState: FavouriteChapterContextType = {
  favChapters: [],
  addToFav: () => {},
  removeFromFav: () => {},
  isChapterFav: () => false,

  favSaints: [],
  addToFavSaint: () => {},
  removeFromFavSaint: () => {},
  isSaintFav: () => false,
};

const FavouriteContext =
  createContext<FavouriteChapterContextType>(initialState);

const FavouriteProvider = ({ children }: ProviderProps) => {
  const { getItem, setItem } = useLocalStorage();
  const [favouriteChapters, setFavouriteChapters] = useState<
    FavouriteChapterType[]
  >([]);
  const [favouriteSaints, setFavouriteSaints] = useState<Saint[]>([]);

  const addToFavChapters = (chapter: FavouriteChapterType) => {
    setFavouriteChapters([...favouriteChapters, chapter]);
    setItem(LocalStorageKeys.FAV_CHAPTERS, [...favouriteChapters, chapter]);
  };

  const removeFromFavChapters = (chapter: FavouriteChapterType) => {
    const foundIndex = favouriteChapters.findIndex(
      (prev) =>
        prev.bibleBook.value === chapter.bibleBook.value &&
        prev.chapter === chapter.chapter
    );

    if (foundIndex < 0) return;
    const filtered = favouriteChapters.filter(
      (_, index) => foundIndex !== index
    );

    setFavouriteChapters(filtered);
    setItem(LocalStorageKeys.FAV_CHAPTERS, filtered);
  };

  const isChapterFavourite = (book: BibleBookType, chapter: number) => {
    return !!favouriteChapters.find(
      (fav) => fav.bibleBook.value === book.value && fav.chapter === chapter
    );
  };

  const addToFavSaint = (saint: Saint) => {
    setFavouriteSaints([...favouriteSaints, saint]);
    setItem(LocalStorageKeys.FAV_SAINTS, [...favouriteSaints, saint]);
  };

  const removeFromFavSaint = (saint: Saint) => {
    const foundIndex = favouriteSaints.findIndex(
      (prev) => prev.name === saint.name
    );

    if (foundIndex < 0) return;
    const filtered = favouriteSaints.filter((_, index) => foundIndex !== index);

    setFavouriteSaints(filtered);
    setItem(LocalStorageKeys.FAV_SAINTS, filtered);
  };

  const isSaintFavourite = (saint: Saint) => {
    return !!favouriteSaints.find((fav) => fav.name === saint.name);
  };

  useEffect(() => {
    const localStorageFavourites = getItem(LocalStorageKeys.FAV_CHAPTERS);
    localStorageFavourites && setFavouriteChapters(localStorageFavourites);

    const localStorageSaints = getItem(LocalStorageKeys.FAV_SAINTS);
    localStorageSaints && setFavouriteSaints(localStorageSaints);
  }, []);
  return (
    <FavouriteContext.Provider
      value={{
        favChapters: favouriteChapters,
        addToFav: addToFavChapters,
        removeFromFav: removeFromFavChapters,
        isChapterFav: isChapterFavourite,

        favSaints: favouriteSaints,
        addToFavSaint: addToFavSaint,
        removeFromFavSaint: removeFromFavSaint,
        isSaintFav: isSaintFavourite,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
};

const useFavouriteContext = () => {
  return useContext(FavouriteContext);
};

export { FavouriteContext, FavouriteProvider, useFavouriteContext };
