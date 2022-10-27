import { Container as ChakraUIContainer } from "@chakra-ui/react";

const Container = ({
  children,
  ...props
}: {
  children: React.ReactNode;
}): JSX.Element => {
  return (
    <ChakraUIContainer maxWidth="1360px" px="40px" {...props}>
      {children}
    </ChakraUIContainer>
  );
};

export default Container;
