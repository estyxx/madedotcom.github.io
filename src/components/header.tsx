import { Flex } from "@chakra-ui/react";
import Container from "components/container";
import Logo from "components/logo";
import { MenuLinks } from "components/menu-links";
import { MenuToggle } from "components/menu-toggle";
import { FC, useState } from "react";

const HeaderContainer: FC = ({ children }) => {
  return (
    <Flex
      as="nav"
      align="center"
      boxShadow="base"
      justify="space-between"
      wrap="wrap"
      w="100%"
      py="12px"
    >
      <Container>
        <Flex maxW="8xl" w="100%" margin="auto">
          {children}
        </Flex>
      </Container>
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
