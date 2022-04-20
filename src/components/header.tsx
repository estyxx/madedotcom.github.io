import { Flex } from "@chakra-ui/react";
import Logo from "components/logo";
import { MenuLinks } from "components/menu-links";
import { MenuToggle } from "components/menu-toggle";
import { FC, useState } from "react";

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
