import AnimatedLayout from "@/components/Animated/AnimatedLayout";
import Card from "@/components/Containers/Card";
import IndexBar from "@/components/Containers/IndexBar";
import MainContainer from "@/components/Containers/MainContainer";
import PaddingBox from "@/components/Containers/PaddingBox";
import Book from "@/components/Icons/Book";
import SaintIcon from "@/components/Icons/SaintIcon";
import Settings from "@/components/Icons/Settings";
import BodyText from "@/components/Text/BodyText";
import StrongText from "@/components/Text/StrongText";
import AchievementsDemo from "./components/AchievementsDemo";
import useProfile from "./useProfile";

const ProfilePage = () => {
  const {
    achievements,
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
  } = useProfile();

  return (
    <MainContainer>
      <IndexBar sticky text="Perfil" />
      <AnimatedLayout>
        <MainContainer>
          <PaddingBox className="flex flex-col gap-3">
            <Card>
              <AchievementsDemo
                achievements={achievements}
                onAllAchievementsClick={onAllAchievementsClick}
              />
            </Card>

            <Card className="flex flex-col gap-3">
              <div
                className="py-3 border-b border-gray-200 cursor-pointer"
                onClick={onBibleSettingsClick}
              >
                <div className="flex flex-row items-center gap-2">
                  <Book filled size={9} />
                  <BodyText className="text-xl">La Biblia</BodyText>
                </div>
              </div>
              <div
                className="py-3 border-b border-gray-200 cursor-pointer"
                onClick={onSaintsSettingsClick}
              >
                <div className="flex flex-row items-center gap-2">
                  <SaintIcon filled size={9} />
                  <BodyText className="text-xl">Santoral</BodyText>
                </div>
              </div>

              <div
                className="py-3 border-b border-gray-200 cursor-pointer"
                onClick={onSettingsClick}
              >
                <div className="flex flex-row items-center gap-2">
                  <Settings filled size={9} />
                  <BodyText className="text-xl">Preferencias</BodyText>
                </div>
              </div>
            </Card>
            <Card>
              <StrongText>DEBUG DEBUG DEBUG DEBUG </StrongText>
              <SettingsItem onClick={deleteQuestions}>
                Delete localstorage qestions
              </SettingsItem>
              <SettingsItem onClick={changeTheme}>Cambiar tema</SettingsItem>
              <SettingsItem onClick={debugNotification5}>
                Notificación en 5 segundos
              </SettingsItem>
              <SettingsItem onClick={debugNotification60}>
                Notificación en 60 segundos
              </SettingsItem>
              <SettingsItem onClick={debugNotificationEveryMinute}>
                Notificación testitng
              </SettingsItem>
              <SettingsItem onClick={debugNotification30Random}>
                Notificación Random en 30 segundos
              </SettingsItem>
            </Card>
          </PaddingBox>
        </MainContainer>
      </AnimatedLayout>
    </MainContainer>
  );
};

export default ProfilePage;

type SettingsItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

const SettingsItem = ({ children, onClick }: SettingsItemProps) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-between p-3 border-b border-gray-200"
    >
      <BodyText>{children}</BodyText>
    </div>
  );
};
