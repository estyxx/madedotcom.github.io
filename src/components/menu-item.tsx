import { HStack, Link, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

type MenuItemProps = {
  to: string;
  target?: string;
  icon?: ReactNode;
  children: ReactNode;
};

export const MenuItem = ({
  children,
  to = "/",
  target = "",
  icon,
  ...props
}: MenuItemProps) => {
  return (
    <Link href={to} target={target}>
      <HStack w="100%">
        <Text {...props}>{children}</Text>
        {icon}
      </HStack>
    </Link>
  );
};
