import { useTheme } from "@/context/theme";
import useNav from "@/hooks/useNav";
import usePreferences from "@/hooks/usePreferences";
import { AppFontSizes } from "@/types/preferences";

const usePreferencesPage = () => {
  const { setTheme, theme } = useTheme();
  const { preferences, changeFontSize } = usePreferences();
  const { goBack } = useNav();

  const onChangeTheme = (value: "system" | "light" | "dark") => {
    setTheme(value);
  };

  const onFontSizeChange = (value: AppFontSizes) => {
    changeFontSize(value);
  };

  return {
    preferences,
    theme,
    goBack,
    onChangeTheme,
    onFontSizeChange,
  };
};

export default usePreferencesPage;
