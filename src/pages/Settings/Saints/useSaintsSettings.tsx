import useNav from "@/hooks/useNav";
import useNotifications from "@/hooks/useNotifications";
import { LocalNotificationSchema } from "@capacitor/local-notifications";
import { useEffect, useState } from "react";

const useSaintsSettings = () => {
  const { listNotifications, cancelNotification } = useNotifications();
  const { goBack } = useNav();

  const [notifications, setNotifications] = useState<LocalNotificationSchema[]>(
    []
  );

  const listLocalNotifications = async () => {
    const { notifications } = await listNotifications();
    setNotifications(notifications);
  };

  const onCancelNotification = async (id: number) => {
    await cancelNotification(id);
    listLocalNotifications();
  };

  useEffect(() => {
    listLocalNotifications();
  }, []);

  return {
    goBack,
    notifications,
    onCancelNotification,
  };
};

export default useSaintsSettings;
