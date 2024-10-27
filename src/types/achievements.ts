export type AchievementsType = {
  totalDays: number;
  daysInRow: number;
  timeReadingBible: number; // in minutes
  chaptersRead: number[];
  hasReadWholeBible: boolean;
  lastEntered: Date | undefined;
};
