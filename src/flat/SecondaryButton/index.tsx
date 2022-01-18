import { Button, ButtonProps } from "@chakra-ui/button";

function SecondaryButton(props: ButtonProps) {
  return (
    <Button
      backgroundColor="#FFD29B"
      _hover={{ bg: "#f5c68c" }}
      variant="solid"
      fontSize="xl"
      whiteSpace="normal"
      m={2}
      _active={{
        bg: "#f7c17e",
        // transform: "scale(0.98)",
        // borderColor: "#bec3c9",
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default SecondaryButton;
