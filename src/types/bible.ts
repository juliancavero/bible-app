import { Segments } from "@/lib/Segments";
import { BibleVersions } from "./preferences";
import { Saint } from "./saints";

export type BibleContextType = {
  bibleBooks: BibleBookType[];
  oldBooks: BibleBookType[];
  newBooks: BibleBookType[];
};

export type FavouriteChapterContextType = {
  favChapters: FavouriteChapterType[];
  addToFav: (chapter: FavouriteChapterType) => void;
  removeFromFav: (chapter: FavouriteChapterType) => void;
  isChapterFav: (book: BibleBookType, chapter: number) => boolean;

  favSaints: Saint[];
  addToFavSaint: (saint: Saint) => void;
  removeFromFavSaint: (saint: Saint) => void;
  isSaintFav: (saint: Saint) => boolean;
};

export type BibleBookType = {
  label: string;
  chapters: number;
  order: number;
  segment: Segments;
  value: string;
};

export type FavouriteChapterType = {
  bibleBook: BibleBookType;
  chapter: number;
};

export type FavouriteSaintType = {
  saint: Saint;
};

export type Chapter = {
  id: number;
  book: string;
  chapter: number;
  text: string;
  createdAt: Date;
  version: BibleVersions;
};

export type Teaching = {
  id: number;
  book: string;
  chapter: number;
  text: string;
  createdAt: Date;
  day: number;
  month: number;
  year: number;
  image?: string;
};
