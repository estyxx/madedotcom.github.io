import { Box, Flex } from "@chakra-ui/react";

const Footer: React.FC = ({ children }) => {
  return (
    <Box
      as="footer"
      role="contentinfo"
      mx="auto"
      bg="#F8F8F8"
      bottom={0}
      left={0}
      width="100%"
      position="fixed"
    >
      <Flex maxW="8xl" w="100%" margin="auto">
        {children}
      </Flex>
    </Box>
  );
};
export default Footer;
