import React from "react";
import { Box } from "@chakra-ui/react";
export interface MidBoxProps {}

const MidBox: React.FC<MidBoxProps> = ({ children }) => {
  return (
    <>
      <Box ml="auto" mr="auto">
        {children}
      </Box>
    </>
  );
};

export default MidBox;
