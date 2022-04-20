import { Box, Stack } from "@chakra-ui/react";
import { MenuItem } from "components/menu-item";
import { FiExternalLink } from "react-icons/fi";

export const MenuLinks = ({ isOpen }: { isOpen: boolean }) => {
  return (
    <Box
      display={{ base: isOpen ? "block" : "none", md: "block" }}
      flexBasis={{ base: "100%", md: "auto" }}
      ml="auto"
    >
      <Stack
        spacing={8}
        align="center"
        justify={["center", "space-between", "flex-end", "flex-end"]}
        direction={["column", "row", "row", "row"]}
        pt={[4, 4, 0, 0]}
      >
        <MenuItem to="/">Home</MenuItem>
        <MenuItem
          to="https://www.made.com/careers"
          target="_blank"
          icon={<FiExternalLink />}
        >
          Careers
        </MenuItem>
      </Stack>
    </Box>
  );
};
