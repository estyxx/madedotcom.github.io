import { Heading, Box, Flex, Text } from "@chakra-ui/react";
import Container from "components/container";

const LandingPage = (): JSX.Element => {
  return (
    <Box height="640px" backgroundColor="made.black">
      <Flex
        color="white"
        flexDirection="column"
        justifyContent="center"
        gap="24px"
        height="100%"
      >
        <Container>
          <Box ml="116px" maxWidth="445px">
            <Heading as="h1" fontSize="80px" mb="24px">
              Tech Blog
            </Heading>
            <Text fontSize="16px">
              A place for Made's Tech team to share ideas, experiences and learnings.
            </Text>
          </Box>
        </Container>
      </Flex>
    </Box>
  );
};

export default LandingPage;
