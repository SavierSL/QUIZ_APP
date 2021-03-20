import { useColorMode, Switch } from "@chakra-ui/react";
import theme from "../theme";

export const DarkModeSwitch = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const isDark = colorMode === "dark";

  return (
    <Switch
      position="fixed"
      zIndex={1000}
      top="1rem"
      right="1rem"
      color="green"
      isChecked={isDark}
      onChange={toggleColorMode}
    />
  );
};
