import { AppFontSizes } from "@/types/preferences";

export const changeRootFontSize = (fontSize: AppFontSizes) => {
  switch (fontSize) {
    case "default":
      document.documentElement.style.fontSize = "1rem";
      break;
    case "medium":
      document.documentElement.style.fontSize = "1.15rem";
      break;
    case "large":
      document.documentElement.style.fontSize = "1.30rem";
      break;
  }
};
