import { Flex } from "@chakra-ui/react";
import Container from "components/container";
import Logo from "components/logo";
import { MenuLinks } from "components/menu-links";

const HeaderContainer = ({ children }: { children: React.ReactNode }): JSX.Element => {
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
  // const [isOpen, setIsOpen] = useState(false);

  // const toggle = () => setIsOpen(!isOpen);

  return (
    <HeaderContainer>
      <Logo />
      {/* <MenuToggle toggle={toggle} isOpen={isOpen} /> */}
      <MenuLinks />
    </HeaderContainer>
  );
};
