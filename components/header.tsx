import { Box, Flex } from "@chakra-ui/react";
import { FC, useState } from "react";
import Logo from "components/logo";
import { MenuToggle } from "components/menu-toggle";
import { MenuLinks } from "components/menu-links";

const HeaderContainer: FC = ({ children }) => {
  return (
    <Flex
      as="header"
      align="center"
      boxShadow="base"
      justify="space-between"
      wrap="wrap"
      w="100%"
      mb={8}
      p={8}
    >
      <Flex maxW="8xl" w="100%" margin="auto">
        {children}
      </Flex>
    </Flex>
  );
};

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <HeaderContainer>
      <Logo />
      <MenuToggle toggle={toggle} isOpen={isOpen} />
      <MenuLinks isOpen={isOpen} />
    </HeaderContainer>
  );
};
