import { BibleBooks } from "@/lib/BibleBooks";
import { Segments } from "@/lib/Segments";
import { BibleContextType } from "@/types/bible";
import { ProviderProps } from "@/types/common";
import { createContext, useContext, useMemo } from "react";

const initialState: BibleContextType = {
  bibleBooks: BibleBooks,
  oldBooks: [],
  newBooks: [],
};

const BibleContext = createContext<BibleContextType>(initialState);

const BibleProvider = ({ children }: ProviderProps) => {
  const bib = useMemo(() => {
    const oldBooks = initialState.bibleBooks
      .filter((book) => book.segment === Segments.Old)
      .sort((a, b) => a.order - b.order);
    const newBooks = initialState.bibleBooks
      .filter((book) => book.segment === Segments.New)
      .sort((a, b) => a.order - b.order);
    return {
      oldBooks,
      newBooks,
    };
  }, []);
  return (
    <BibleContext.Provider
      value={{
        bibleBooks: initialState.bibleBooks,
        oldBooks: bib.oldBooks,
        newBooks: bib.newBooks,
      }}
    >
      {children}
    </BibleContext.Provider>
  );
};

const useBibleContext = () => {
  return useContext(BibleContext);
};

export { BibleContext, BibleProvider, useBibleContext };
