import { AchievementsType } from "@/types/achievements";
import { useEffect, useReducer } from "react";
import useLocalStorage, { LocalStorageKeys } from "./useLocalStorage";

type AchievementsAction = {
  type:
    | "addDay"
    | "addTime"
    | "addChapter"
    | "resetInARow"
    | "resetTime"
    | "resetChapters"
    | "setWholeBible"
    | "updateLastEntered"
    | "recordAchievements";
  payload?: string | number | AchievementsType;
};

const initialState: AchievementsType = {
  totalDays: 1,
  daysInRow: 1,
  timeReadingBible: 0,
  chaptersRead: [],
  hasReadWholeBible: false,
  lastEntered: undefined,
};

const reducerFn = (
  state: AchievementsType,
  action: AchievementsAction
): AchievementsType => {
  switch (action.type) {
    case "addDay":
      return {
        ...state,
        totalDays: state.totalDays + 1,
        daysInRow: state.daysInRow + 1,
      };
    case "addTime":
      if (typeof action.payload !== "number") {
        return state;
      }
      return {
        ...state,
        timeReadingBible: state.timeReadingBible + action.payload!,
      };
    case "addChapter":
      if (typeof action.payload !== "number") {
        return state;
      }
      return {
        ...state,
        chaptersRead: [...state.chaptersRead, action.payload],
        hasReadWholeBible: state.chaptersRead.length + 1 >= 1189,
      };
    case "resetInARow":
      return {
        ...state,
        daysInRow: 1,
      };
    case "resetTime":
      return {
        ...state,
        timeReadingBible: 0,
      };
    case "resetChapters":
      return {
        ...state,
        chaptersRead: [],
      };
    case "setWholeBible":
      return {
        ...state,
        hasReadWholeBible: true,
      };
    case "recordAchievements":
      if (typeof action.payload !== "object") {
        return state;
      }
      return {
        ...state,
        ...action.payload,
      };
    case "updateLastEntered":
      return {
        ...state,
        lastEntered: new Date(),
      };
    default:
      return state;
  }
};

const useAchievements = () => {
  const { getItem, setItem } = useLocalStorage();
  const [state, reducer] = useReducer(reducerFn, initialState);
  const storedAchievements = getItem(LocalStorageKeys.ACHIEVEMENTS);

  const setWholeBible = () => {
    reducer({ type: "setWholeBible" });
  };

  const addDay = () => {
    reducer({ type: "addDay" });
  };

  const addTime = () => {
    reducer({ type: "addTime", payload: 1 });
  };

  const addChapter = (id: number) => {
    if (state.chaptersRead.includes(id)) return;
    reducer({ type: "addChapter", payload: id });
  };

  const resetInARow = () => {
    reducer({ type: "resetInARow" });
  };

  const resetTime = () => {
    reducer({ type: "resetTime" });
  };

  const resetChapters = () => {
    reducer({ type: "resetChapters" });
  };

  const recordAchievements = (achievements: AchievementsType) => {
    reducer({ type: "recordAchievements", payload: achievements });
  };

  const updateLastEntered = () => {
    reducer({ type: "updateLastEntered" });
  };

  useEffect(() => {
    if (storedAchievements && Object.keys(storedAchievements).length > 0) {
      reducer({ type: "recordAchievements", payload: storedAchievements });
    } else {
      setItem(LocalStorageKeys.ACHIEVEMENTS, state);
    }
  }, []);

  useEffect(() => {
    setItem(LocalStorageKeys.ACHIEVEMENTS, state);
  }, [state]);

  return {
    achievements: state,
    addDay,
    addTime,
    addChapter,
    resetInARow,
    resetTime,
    resetChapters,
    setWholeBible,
    updateLastEntered,
    recordAchievements,
  };
};

export default useAchievements;
