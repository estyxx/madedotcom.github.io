import { Box, Flex, Text, Center, HStack } from "@chakra-ui/react";
import Container from "components/container";

const Footer = (): JSX.Element => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      height="50px"
      bottom="0"
      width="100%"
      position="fixed"
      backgroundColor="made.20"
    >
      <Container>
        <Flex w="100%" margin="auto" py="16px">
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
