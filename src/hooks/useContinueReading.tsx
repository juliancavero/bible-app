import { BibleBookType } from "@/types/bible";
import useLocalStorage, { LocalStorageKeys } from "./useLocalStorage";

export type ContinueReadingType = {
  bibleBook: BibleBookType;
  chapter: number;
};

const useContinueReading = () => {
  const { getItem, setItem } = useLocalStorage();

  const continueReading = (): ContinueReadingType | null => {
    const continueReading = getItem(LocalStorageKeys.CONTINUE_READING);
    return continueReading;
  };

  const saveContinueReading = (chapter: ContinueReadingType) => {
    setItem(LocalStorageKeys.CONTINUE_READING, chapter);
  };

  return {
    continueReading,
    saveContinueReading,
  };
};

export default useContinueReading;
