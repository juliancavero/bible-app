import { BibleVersions } from "@/types/preferences";

export const getAttribution = (version: BibleVersions) => {
  switch (version) {
    case BibleVersions.nvi:
      return `Santa Biblia, Nueva Versión Internacional® NVI®© 1999, 2015, 2022 por Biblica, Inc. Usado con permiso. Reservados todos los derechos en todo el mundo.`;
    case BibleVersions.rv1909:
      return "Reina-Valera 1909 - Dominio público.";
    case BibleVersions.torresAmat:
      return "Biblia Torres Amat 1825 - Dominio público.";
    case BibleVersions.freeWorld:
      return `Santa Biblia Libre para el Mundo. Traducido por: David Williams & Michael Paul Johnson. Dominio Público`;
    default:
      return "";
  }
};
