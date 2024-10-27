import { Outlet } from "react-router-dom";
import { BottomTabs, LeftTabs } from "../BottomTabs";

const NavFrame = () => {
  return (
    <Principal>
      <LeftTabs />
      <Outlet />
      <BottomTabs />
    </Principal>
  );
};

export default NavFrame;

type CommonProps = {
  children: React.ReactNode;
};

const Principal = ({ children }: CommonProps) => {
  return (
    <div className="flex flex-col md:flex-row h-full min-h-screen bg-wallpaper">
      {children}
    </div>
  );
};
