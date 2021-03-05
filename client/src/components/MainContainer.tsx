import { Box, useColorMode } from "@chakra-ui/react";

const MainContainer: React.FC<any> = (props: any) => {
  const { colorMode } = useColorMode();

  const bgColor = { light: "gray.50", dark: "gray.900" };

  const color = { light: "black", dark: "white" };
  return (
    <>
      <Box bg={bgColor[colorMode]} color={color[colorMode]} {...props} />
    </>
  );
};

export default MainContainer;
