import { Box } from "@chakra-ui/react";
import React from "react";
import { FiMenu, FiX } from "react-icons/fi";

type MenuProps = {
  toggle: () => void;
  isOpen: boolean;
};

export const MenuToggle = ({ toggle, isOpen }: MenuProps) => {
  return (
    <Box display={{ sm: "block", md: "none" }} onClick={toggle}>
      {isOpen ? <FiX /> : <FiMenu />}
    </Box>
  );
};
