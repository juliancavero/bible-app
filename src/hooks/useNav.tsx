import AppRoutes from "@/context/router/routes";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const bottomTabs = ["/", "/saints", "/bible", "/questions", "/settings"];

const useNav = () => {
  const navigator = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("/");

  const goTo = (path: AppRoutes, ...params: any[]) => {
    let route = String(path);
    params.forEach((param) => {
      route += `/${String(param)}`;
    });

    navigator(route);
    if (bottomTabs.includes(route)) {
      setActiveTab(route);
    }
    window.scrollTo(0, 0);
  };

  const goToBook = (book: string, chapter: number) => {
    goTo(AppRoutes.BIBLE, book, String(chapter));
  };

  const goBack = () => {
    navigator(-1);
  };

  useEffect(() => {
    if (bottomTabs.includes(location.pathname)) {
      setActiveTab(location.pathname);
    }
  }, [location]);

  return {
    goBack,
    goTo,
    goToBook,
    location,
    activeTab,
  };
};

export default useNav;
