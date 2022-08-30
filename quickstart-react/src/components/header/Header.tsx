import * as React from "react";
import { useEffect, useState } from "react";
import { storageGetItem } from "../../services/monday.api";
import { TopBar } from "./HeaderStyle";

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const [theme, setTheme] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      const theme = await storageGetItem("theme");
      setTheme(theme);
    };
    fetchData();
  });

  return (
    <TopBar>
      {theme === "light" && (
        <img
          src={require("../../assets/eco-logo.svg")}
          alt="logo"
          height="60"
          width="160"
        />
      )}
      {theme === "dark" && (
        <img
          src={require("../../assets/eco-logo-dark.svg")}
          alt="logo"
          height="62"
          width="160"
        />
      )}
    </TopBar>
  );
};

export default Header;
