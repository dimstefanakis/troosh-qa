import { Button, ButtonProps } from "@chakra-ui/button";

function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      backgroundColor="#AAF0D1"
      _hover={{ bg: "#91e9c2" }}
      variant="solid"
      fontSize="xl"
      whiteSpace="normal"
      m={2}
      _active={{
        bg: "#7ae7b6",
        // transform: "scale(0.98)",
        // borderColor: "#bec3c9",
      }}
      {...props}
    >
      {props.children}
    </Button>
  );
}

export default PrimaryButton;
