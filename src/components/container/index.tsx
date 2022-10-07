import { Container as ChakraUIContainer } from "@chakra-ui/react";

const Container = ({ children }: { children: React.ReactNode }): JSX.Element => {
  return (
    <ChakraUIContainer maxWidth="1360px" px="40px">
      {children}
    </ChakraUIContainer>
  );
};

export default Container;
