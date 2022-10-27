import { Box, Center, Flex, HStack, Text } from "@chakra-ui/react";
import Container from "components/container";

const Footer = (): JSX.Element => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      bottom="0"
      width="100%"
      backgroundColor="made.20"
    >
      <Container>
        <Flex w="100%" py="16px">
          <Center w="100%">
            <HStack spacing="40px">
              <Text>© 2022 MADE</Text>
              <Text>Terms and conditions</Text>
              <Text>Cookies & privacy policy</Text>
            </HStack>
          </Center>
        </Flex>
      </Container>
    </Box>
  );
};
export default Footer;
