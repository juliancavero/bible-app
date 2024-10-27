import { AchievementsProvider } from "./custom/achievements";
import { BibleProvider } from "./custom/bible";
import { FavouriteProvider } from "./custom/favourites";
import QueryProv from "./query";
import RouterProv from "./router";
import { ThemeProvider } from "./theme";
import ToasterProvider from "./toaster";

const MainProvider = () => {
  return (
    <ThemeProvider>
      <QueryProv>
        <BibleProvider>
          <FavouriteProvider>
            <AchievementsProvider>
              <ToasterProvider>
                <RouterProv />
              </ToasterProvider>
            </AchievementsProvider>
          </FavouriteProvider>
        </BibleProvider>
      </QueryProv>
    </ThemeProvider>
  );
};

export default MainProvider;
