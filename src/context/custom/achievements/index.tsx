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
      const dateComparision = checkDate(achievements.lastEntered);
      if (dateComparision === "TODAY") {
        return;
      }
      if (dateComparision === "NONE") {
        resetInARow();
      }
      addDay();
      updateLastEntered();
    } else {
      updateLastEntered();
    }
    /* switch (dateComparision) {
        case "TODAY":
          break;
        case "YESTERDAY":
          addDay();
          updateLastEntered();
          break;
        default:
          resetInARow();
          addDay();
          updateLastEntered();
          break;
      } */
  }, [achievements.lastEntered]);

  useEffect(() => {
    if (preferences.fontSize) {
      changeRootFontSize(preferences.fontSize);
    }
  }, [preferences.fontSize]);

  return children;
};

export { AchievementsProvider };
