import AppRoutes from "@/context/router/routes";
import { useTheme } from "@/context/theme";
import useAchievements from "@/hooks/useAchievements";
import useLocalStorage, { LocalStorageKeys } from "@/hooks/useLocalStorage";
import useNav from "@/hooks/useNav";
import useNotifications from "@/hooks/useNotifications";

const useProfile = () => {
  const { achievements } = useAchievements();
  const { scheduleNotification } = useNotifications();
  const { deleteItem } = useLocalStorage();
  const { setTheme, theme } = useTheme();
  const { goTo } = useNav();

  const deleteQuestions = () => {
    deleteItem(LocalStorageKeys.STORED_QUESTIONS);
  };

  const onAllAchievementsClick = () => {
    goTo(AppRoutes.ACHIEVEMENTS);
  };

  const onSettingsClick = () => {
    goTo(AppRoutes.PREFERENCES);
  };

  const onBibleSettingsClick = () => {
    goTo(AppRoutes.BIBLE_SETTINGS);
  };

  const onSaintsSettingsClick = () => {
    goTo(AppRoutes.SAINTS_SETTINGS);
  };

  const changeTheme = () => {
    switch (theme) {
      case "system":
        setTheme("light");
        break;
      case "light":
        setTheme("dark");
        break;
      case "dark":
      default:
        setTheme("light");
        break;
    }
  };

  const debugNotification5 = async () => {
    await scheduleNotification({
      title: "Test Notification",
      body: "This is a test notification",
      id: 5,
      at: new Date(Date.now() + 5000),
    });
  };

  const debugNotification60 = async () => {
    await scheduleNotification({
      title: "Test Notification",
      body: "This is a test notification",
      id: 60,
      at: new Date(Date.now() + 60000),
    });
  };

  const debugNotificationEveryMinute = async () => {
    await scheduleNotification({
      title: `Santoral`,
      body: `Hoy es el día de San Pancracio. ¡No te olvides de felicitarlo!`,
      id: 39,
      at: new Date(Date.now() + 10000),
      extra: {
        type: "saint",
        name: "san-pancracio",
        day: 17,
        month: 10,
        id: 39,
      },
    });
  };

  const debugNotification30Random = async () => {
    await scheduleNotification({
      title: "Test Notification",
      body: "This is a test notification",
      id: Math.floor(Math.random() * 1000),
      at: new Date(Date.now() + 30000),
    });
  };

  return {
    achievements,
    theme,
    changeTheme,
    deleteQuestions,
    onAllAchievementsClick,
    onSettingsClick,
    onBibleSettingsClick,
    onSaintsSettingsClick,
    debugNotification5,
    debugNotification60,
    debugNotificationEveryMinute,
    debugNotification30Random,
  };
};

export default useProfile;
