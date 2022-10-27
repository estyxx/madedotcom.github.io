import { Box, Image } from "@chakra-ui/react";
import React from "react";

import Link from "next/link";

export const Logo = () => {
  return (
    <Box>
      <Link href="/">
        <Image
          src="https://media.made.com/mws-assets/images/MadeLogo.2.svg"
          alt="Logo"
          aria-label="Logo"
        />
      </Link>
    </Box>
  );
};

export default Logo;
