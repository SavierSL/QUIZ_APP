import { Flex, Button } from "@chakra-ui/react";
import React from "react";

export interface NavBarProps {}

const NavBar: React.FC<NavBarProps> = () => {
  return (
    <>
      <Flex>
        <Button>HOME</Button>
      </Flex>
    </>
  );
};

export default NavBar;
