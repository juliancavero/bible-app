export type AppFontSizes = "default" | "medium" | "large";

export enum BibleVersions {
  nvi = "nvi",
  rv1909 = "rv1909",
  torresAmat = "torresAmat",
  freeWorld = "freeWorld",
}

export enum BiblePadding {
  small = "Estrecho",
  default = "Automático",
}

export type PreferencesType = {
  fontSize: AppFontSizes;
  bibleVersion: BibleVersions;
  biblePadding: BiblePadding;
};
