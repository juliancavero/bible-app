import {
  AppFontSizes,
  BiblePadding,
  BibleVersions,
  PreferencesType,
} from "@/types/preferences";
import { changeRootFontSize } from "@/utils/fontSize";
import { useEffect, useReducer } from "react";
import useLocalStorage, { LocalStorageKeys } from "./useLocalStorage";

type PreferencesAction = {
  type:
    | "changeFontSize"
    | "recordPreferences"
    | "changeBibleVersion"
    | "changeBiblePadding";
  payload?: string | number | PreferencesType;
};

const initialState: PreferencesType = {
  fontSize: "default",
  bibleVersion: BibleVersions.nvi,
  biblePadding: BiblePadding.default,
};

const reducerFn = (
  state: PreferencesType,
  action: PreferencesAction
): PreferencesType => {
  switch (action.type) {
    case "changeFontSize":
      return {
        ...state,
        fontSize: action.payload as AppFontSizes,
      };
    case "changeBibleVersion":
      return {
        ...state,
        bibleVersion: action.payload as BibleVersions,
      };
    case "changeBiblePadding":
      return {
        ...state,
        biblePadding: action.payload as BiblePadding,
      };
    case "recordPreferences":
      if (typeof action.payload !== "object") {
        return state;
      }
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

const usePreferences = () => {
  const { getItem, setItem } = useLocalStorage();
  const [state, reducer] = useReducer(reducerFn, initialState);
  const storedPreferences = getItem(LocalStorageKeys.PREFERENCES);

  const changeFontSize = (fontSize: AppFontSizes) => {
    reducer({ type: "changeFontSize", payload: fontSize });
    changeRootFontSize(fontSize);
  };

  const changeBibleVersion = (version: BibleVersions) => {
    reducer({ type: "changeBibleVersion", payload: version });
  };

  const changeBiblePadding = (padding: BiblePadding) => {
    reducer({ type: "changeBiblePadding", payload: padding });
  };

  useEffect(() => {
    if (storedPreferences && Object.keys(storedPreferences).length > 0) {
      reducer({ type: "recordPreferences", payload: storedPreferences });
    } else {
      setItem(LocalStorageKeys.PREFERENCES, state);
    }
  }, []);

  useEffect(() => {
    setItem(LocalStorageKeys.PREFERENCES, state);
  }, [state]);

  return {
    preferences: state,
    changeFontSize,
    changeBibleVersion,
    changeBiblePadding,
  };
};

export default usePreferences;
