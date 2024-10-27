import AppRoutes from "@/context/router/routes";
import useNav from "@/hooks/useNav";
import {
  BookOpenIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  HomeIcon,
} from "@heroicons/react/24/outline";
import {
  BookOpenIcon as BookOpenIconSolid,
  ChatBubbleLeftEllipsisIcon as ChatBubbleLeftEllipsisIconSolid,
  Cog6ToothIcon as Cog6ToothIconSolid,
  HomeIcon as HomeIconSolid,
} from "@heroicons/react/24/solid";
import SaintIcon from "../Icons/SaintIcon";
import SaintIconOutline from "../Icons/SaintIconOutline";
import { Button } from "../ui/button";

const iconClasses = "h-6 w-6";

const tabs = [
  {
    name: "Inicio",
    path: AppRoutes.HOME,
    icon: <HomeIcon className={iconClasses} />,
    solidIcon: <HomeIconSolid className={iconClasses} />,
  },
  {
    name: "Santoral",
    path: AppRoutes.SAINTS,
    icon: <SaintIconOutline className={iconClasses + " dark:fill-white"} />,
    solidIcon: <SaintIcon className={iconClasses + " dark:fill-white"} />,
  },
  {
    name: "La Biblia",
    path: AppRoutes.BIBLE,
    icon: <BookOpenIcon className={iconClasses} />,
    solidIcon: <BookOpenIconSolid className={iconClasses} />,
  },
  {
    name: "Consultas",
    path: AppRoutes.QUESTIONS,
    icon: <ChatBubbleLeftEllipsisIcon className={iconClasses} />,
    solidIcon: <ChatBubbleLeftEllipsisIconSolid className={iconClasses} />,
  },
  {
    name: "Perfil",
    path: AppRoutes.PROFILE,
    icon: <Cog6ToothIcon className={iconClasses} />,
    solidIcon: <Cog6ToothIconSolid className={iconClasses} />,
  },
];

export const BottomTabs = () => {
  const { goTo, location } = useNav();

  return (
    <BottomBox>
      {tabs.map((tab) => {
        const active = location.pathname.startsWith(tab.path);
        return (
          <Tab key={tab.name} active={active} onClick={() => goTo(tab.path)}>
            <Button variant={"icon"} size={"icon"}>
              {active ? tab.solidIcon : tab.icon}
            </Button>
            <Span active={active}>{tab.name}</Span>
          </Tab>
        );
      })}
    </BottomBox>
  );
};

export const LeftTabs = () => {
  const { goTo, location } = useNav();

  return (
    <LeftMenu>
      {tabs.map((tab, index) => {
        const active = location.pathname.startsWith(tab.path);
        return (
          <Tab key={index} active={active} onClick={() => goTo(tab.path)}>
            <Button variant={"icon"} size={"icon"}>
              {tab.icon}
            </Button>
            <Span active={active}>{tab.name}</Span>
          </Tab>
        );
      })}
    </LeftMenu>
  );
};

type BottomBoxProps = {
  children: React.ReactNode;
};

const BottomBox = ({ children }: BottomBoxProps) => {
  return (
    <div className="block md:hidden bg-background flex flex-row justify-around items-center border-t-2 border-gray-300  dark:border-gray-600 sticky bottom-0 z-50">
      {children}
    </div>
  );
};

const LeftMenu = ({ children }: BottomBoxProps) => {
  return (
    <div className="min-w-60 hidden md:block flex flex-col justify-around items-center gap-2 p-1 bg-background-alternate border-t border-gray-300 sticky top-0 left-0">
      {children}
    </div>
  );
};

type TabProps = {
  active?: boolean;
  children: React.ReactNode;
  onClick: () => void;
};

const Tab = ({ active, children, onClick }: TabProps) => {
  return (
    <div
      className={`flex flex-col md:flex-row items-center justify-center md:justify-start p-1 w-full border-gray-300 z-50 cursor-pointer ${
        active ? "bg-primary" : "bg-background"
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

type SpanProps = {
  children: React.ReactNode;
  active?: boolean;
};

const Span = ({ children, active }: SpanProps) => {
  return (
    <span
      className={`text-xs md:text-md ${active ? "font-bold" : "font-normal"}`}
    >
      {children}
    </span>
  );
};
