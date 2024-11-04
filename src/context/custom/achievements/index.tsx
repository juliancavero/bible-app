import useAchievements from "@/hooks/useAchievements";
import usePreferences from "@/hooks/usePreferences";
import { ProviderProps } from "@/types/common";
import { checkDate } from "@/utils/dates";
import { changeRootFontSize } from "@/utils/fontSize";
import { useEffect } from "react";

const AchievementsProvider = ({ children }: ProviderProps) => {
  const { achievements, addDay, resetInARow, updateLastEntered } =
    useAchievements();
  const { preferences } = usePreferences();

  useEffect(() => {
    if (achievements.lastEntered) {
      const dateComparison = checkDate(achievements.lastEntered);

      if (dateComparison === "TODAY") {
        return;
      }

      if (dateComparison === "NONE") {
        resetInARow();
      } else if (dateComparison === "YESTERDAY") {
        addDay();
      }

      updateLastEntered();
    } else {
      updateLastEntered();
    }
    console.log("AchievementsProvider");
  }, [achievements.lastEntered, addDay, resetInARow, updateLastEntered]);

  useEffect(() => {
    if (preferences.fontSize) {
      changeRootFontSize(preferences.fontSize);
    }
  }, [preferences.fontSize]);

  return <>{children}</>;
};

export { AchievementsProvider };
