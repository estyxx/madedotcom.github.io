import { Box, Flex, Tag, Text } from "@chakra-ui/react";

type Props = {
  tags?: string[];
  variant?: "sm" | "lg";
};

const styles = {
  flex: {
    sm: { gap: "10px" },
    lg: { gap: "16px" },
  },
  tag: {
    sm: {
      bg: "made.10",
      height: "20px",
      borderRadius: "2px",
      px: "8px",
      py: "1px",
    },
    lg: {
      bg: "white",
      height: "40px",
      padding: "16px",
      border: "solid",
      borderWidth: "1px",
      borderRadius: "8px",
      borderColor: "#e1e3de",
    },
  },
};

export const TagLine = ({
  tags = [],
  variant = "lg",
  ...props
}: Props): JSX.Element => {
  return (
    <Box {...props}>
      <Flex {...styles["flex"][variant]}>
        {tags.map((tag) => (
          <Tag key={tag} {...styles["tag"][variant]}>
            {variant === "sm" ? <Text as="b">{tag}</Text> : <Text>{tag}</Text>}
          </Tag>
        ))}
      </Flex>
    </Box>
  );
};
