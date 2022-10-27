import { HStack, Link, Text } from "@chakra-ui/react";
import { FC, ReactNode } from "react";

type MenuItemProps = {
  to: string;
  target?: string;
  icon?: ReactNode;
};

export const MenuItem: FC<MenuItemProps> = ({
  children,
  to = "/",
  target = "",
  icon,
  ...props
}) => {
  return (
    <Link href={to} target={target}>
      <HStack w="100%">
        <Text {...props}>{children}</Text>
        {icon}
      </HStack>
    </Link>
  );
};
