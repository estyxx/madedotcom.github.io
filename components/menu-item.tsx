import { Link, Text } from "@chakra-ui/react";
import { FC } from "react";

type MenuItemProps = {
  to: string;
};

export const MenuItem: FC<MenuItemProps> = ({ children, to = "/", ...rest }) => {
  return (
    <Link href={to}>
      <Text display="block" {...rest}>
        {children}
      </Text>
    </Link>
  );
};
