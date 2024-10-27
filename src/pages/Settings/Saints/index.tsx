import AnimatedLayout from "@/components/Animated/AnimatedLayout";
import Card from "@/components/Containers/Card";
import IndexBar from "@/components/Containers/IndexBar";
import MainContainer from "@/components/Containers/MainContainer";
import PaddingBox from "@/components/Containers/PaddingBox";
import Cross from "@/components/Icons/Cross";
import BodyText from "@/components/Text/BodyText";
import StrongText from "@/components/Text/StrongText";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import useSaintsSettings from "./useSaintsSettings";

const SaintsSettingsPage = () => {
  const { goBack, notifications, onCancelNotification } = useSaintsSettings();
  return (
    <MainContainer>
      <IndexBar text="Ajustes - Santoral" onClick={goBack} />
      <AnimatedLayout>
        <MainContainer>
          <PaddingBox className="flex flex-col gap-3">
            <Card>
              <PaddingBox>
                <StrongText>Recordatorios programados</StrongText>
              </PaddingBox>

              <PaddingBox className="flex flex-col gap-3">
                <AnimatePresence mode="sync" initial={false}>
                  {notifications.length > 0 ? (
                    notifications.map((n) => (
                      <NotificationItem
                        key={n.id}
                        name={n.extra?.name || ""}
                        day={n.extra?.day || 0}
                        month={n.extra?.month || 0}
                        onCancel={() => onCancelNotification(n.id)}
                      />
                    ))
                  ) : (
                    <SettingsItem>
                      <BodyText>No hay recordatorios programados</BodyText>
                    </SettingsItem>
                  )}
                </AnimatePresence>
              </PaddingBox>
            </Card>
          </PaddingBox>
        </MainContainer>
      </AnimatedLayout>
    </MainContainer>
  );
};

export default SaintsSettingsPage;

type SettingsItemProps = {
  children: React.ReactNode;
  onClick?: () => void;
  first?: boolean;
};

const SettingsItem = ({ children, onClick }: SettingsItemProps) => {
  return (
    <div
      onClick={onClick}
      className={`flex justify-between items-center gap-3 px-1 py-3 border-b border-gray-200`}
    >
      {children}
    </div>
  );
};

type NotificationItemProps = {
  name: string;
  day: number;
  month: number;
  onCancel: () => void;
  key: number;
};

const NotificationItem = ({
  name,
  day,
  month,
  onCancel,
}: NotificationItemProps) => {
  const remainingDays = getRemainingDays(day, month);
  return (
    <motion.div
      initial={{ opacity: 0, height: 0 }}
      animate={{ opacity: 1, height: "auto" }}
      exit={{ opacity: 0, height: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="grid grid-cols-12 gap-5 items-center border-b border-zinc-600 pb-3">
        <BodyText className="col-span-6">{`${name}`}</BodyText>
        <BodyText className="col-span-3">{`${remainingDays} ${
          remainingDays > 1 ? "días" : "día"
        }`}</BodyText>
        <Button variant={"link"} onClick={onCancel} className="col-span-3">
          <Cross />
        </Button>
      </div>
    </motion.div>
  );
};

const getRemainingDays = (day: number, month: number) => {
  const now = new Date();
  const toCompare = new Date(now.getFullYear(), month - 1, day);
  const target =
    now.getTime() > toCompare.getTime()
      ? new Date(now.getFullYear() + 1, month - 1, day)
      : toCompare;
  const diff = target.getTime() - now.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
};
