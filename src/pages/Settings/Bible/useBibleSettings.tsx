import useNav from "@/hooks/useNav";
import usePreferences from "@/hooks/usePreferences";
import { BiblePadding, BibleVersions } from "@/types/preferences";
import { useMemo } from "react";

const bibleVersions = [
  {
    label: "Nueva Versión Internacional",
    value: BibleVersions.nvi,
  },
  {
    label: "Reina Valera 1909",
    value: BibleVersions.rv1909,
  },
  {
    label: "Biblia Torres Amat",
    value: BibleVersions.torresAmat,
  },
  {
    label: "Santa Biblia Libre para el Mundo",
    value: BibleVersions.freeWorld,
  },
];

const paddingOptions = [
  {
    label: "Automático",
    value: BiblePadding.default,
  },
  {
    label: "Pequeño",
    value: BiblePadding.small,
  },
];

const useBibleSettings = () => {
  const { goBack } = useNav();
  const { preferences, changeBibleVersion, changeBiblePadding } =
    usePreferences();

  const renderBibleVersion = useMemo(() => {
    return bibleVersions.find((v) => v.value === preferences.bibleVersion)
      ?.label;
  }, [preferences.bibleVersion]);

  return {
    goBack,
    bibleVersions,
    paddingOptions,
    version: preferences.bibleVersion,
    biblePadding: preferences.biblePadding,
    changeBibleVersion,
    changeBiblePadding,
    renderBibleVersion,
  };
};

export default useBibleSettings;
