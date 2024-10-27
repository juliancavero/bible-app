import useGetSaintDetails from "@/api/useGetSaintDetails";
import { useFavouriteContext } from "@/context/custom/favourites";
import useNav from "@/hooks/useNav";
import useNotifications from "@/hooks/useNotifications";
import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

const useSaintDetails = () => {
  const { id = "" } = useParams();
  const { goBack } = useNav();
  const { scheduleNotification, cancelNotification } = useNotifications();
  const { data, isLoading, isError } = useGetSaintDetails(id);
  const { favSaints, addToFavSaint, isSaintFav, removeFromFavSaint } =
    useFavouriteContext();
  const [imageOpen, setImageOpen] = useState(false);

  const todaysDate = useMemo(() => {
    if (!data) return new Date();
    return new Date(
      new Date().getFullYear(),
      Number(data.month) - 1,
      Number(data.day)
    );
  }, [data]);

  const onBack = () => {
    goBack();
  };

  const toggleFavourite = () => {
    if (!data) return;
    const isFavourite = isSaintFav(data);

    if (isFavourite) {
      removeFromFavSaint(data);
    } else {
      addToFavSaint(data);
    }
  };

  const onNotificationRequest = async () => {
    if (!data) return;
    await scheduleNotification({
      title: `Santoral`,
      body: `Hoy es el día de ${data.name}. ¡No te olvides de felicitarlo!`,
      id: data.id,
      on: new Date(
        new Date().getFullYear(),
        Number(data.month) - 1,
        Number(data.day),
        9
      ),
      extra: {
        type: "saint",
        name: data.name,
        day: Number(data.day),
        month: Number(data.month),
        id: data.id,
      },
    });

    toast("Notificación programada", {
      position: "top-center",
      action: {
        label: "Cancelar",
        onClick: () => {
          cancelNotification(data.id);
        },
      },
    });
  };

  const isFavourite = useMemo(() => {
    if (!data) return false;
    return isSaintFav(data);
  }, [data, favSaints]);

  return {
    data,
    onBack,
    isError,
    isLoading,
    imageOpen,
    todaysDate,
    isFavourite,
    setImageOpen,
    toggleFavourite,
    onNotificationRequest,
  };
};

export default useSaintDetails;
