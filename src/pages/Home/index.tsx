import AnimatedLayout from "@/components/Animated/AnimatedLayout";
import MainContainer from "@/components/Containers/MainContainer";
import PaddingBox from "@/components/Containers/PaddingBox";
import AppRoutes from "@/context/router/routes";
import useNav from "@/hooks/useNav";
import { LocalNotifications } from "@capacitor/local-notifications";
import { useEffect } from "react";
import SaintsBook from "./components/SaintsBook";
import TodaysQuote from "./components/TodaysQuote";

const HomePage = () => {
  const { goTo } = useNav();

  useEffect(() => {
    LocalNotifications.addListener(
      "localNotificationActionPerformed",
      (data) => {
        const id = data.notification.extra?.id;
        if (id) {
          goTo(AppRoutes.SAINTS, id);
        }
      }
    );
  }, []);

  return (
    <MainContainer>
      <AnimatedLayout>
        <MainContainer>
          <PaddingBox>
            <TodaysQuote />
          </PaddingBox>
          <PaddingBox>
            <SaintsBook />
          </PaddingBox>
        </MainContainer>
      </AnimatedLayout>
    </MainContainer>
  );
};

export default HomePage;
