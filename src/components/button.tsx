import { Button, Center } from "@chakra-ui/react";

type Props = {
  children: React.ReactNode;
};

export const SecondaryButton = ({ children }: Props): JSX.Element => {
  return (
    <Center>
      <Button
        mt="80px"
        mb="114px"
        width="227px"
        height="54px"
        padding="17px 54px"
        border="solid"
        borderWidth="1px"
        borderColor="made.90"
        bg="made.5"
      >
        {children}
      </Button>
    </Center>
  );
};
