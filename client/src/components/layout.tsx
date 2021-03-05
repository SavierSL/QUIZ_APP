import { Box } from "@chakra-ui/react";
import React from "react";
import { DarkModeSwitch } from "./darkModeSwitch";
import NavBar from "./navBar";
interface LayoutProps {
  withNav: boolean;
}

const Layout: React.FC<LayoutProps> = ({ withNav, children }) => {
  return (
    <>
      {withNav ? <NavBar /> : ""}
      <DarkModeSwitch />
      {children}
    </>
  );
};

export default Layout;
