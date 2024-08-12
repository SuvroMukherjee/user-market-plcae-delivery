import { useEffect } from "react";
import { Header } from "./header/Header";
import HomeHeader from "./header/HomeHeader";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export const HeaderPath = () => {
  const location = useLocation();
  const path = location?.pathname;

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "instant",
    });
  }, [path]);

  return <>{path === "/" ? <HomeHeader /> : <Header />}</>;
};
