import { IconButton } from "@chakra-ui/react";
import { ButtonProps } from "@chakra-ui/button";
import { AddIcon } from "@chakra-ui/icons";

function AddButton(props: ButtonProps) {
  return (
    <IconButton
      aria-label="Search database"
      color="black"
      backgroundColor="#AAF0D1"
      _hover={{ bg: "#91e9c2" }}
      _active={{
        bg: "#7ae7b6",
        // transform: "scale(0.98)",
        // borderColor: "#bec3c9",
      }}
      {...props}
      icon={<AddIcon />}
    />
  );
}

export default AddButton;
