import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  PopoverAnchor,
} from "@chakra-ui/react";
import { Box, Flex } from "@chakra-ui/layout";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";

interface StepDotProps {
  step: number;
}

function ProgressBar() {
  return (
    <Flex
      justifyContent="center"
      alignItems="center"
      w="100%"
      h="25px"
      position="relative"
      mb={10}
    >
      <BackgroundBar />
      <Flex w="100%" justifyContent="space-between">
        <StepDot step={0} />
        <StepDot step={1} />
        <StepDot step={2} />
      </Flex>
    </Flex>
  );
}

function StepDot({ step }: StepDotProps) {
  const { currentStep } = useSelector((state: RootState) => state.progress);

  return (
    <Box
      zIndex={1}
      h="25px"
      w="25px"
      backgroundColor={step == currentStep ? "#FFD29B" : "white"}
      borderRadius="100%"
      border={`5px solid ${step == currentStep ? "#FFD29B" : "#AAF0D1"}`}
    ></Box>
  );
}

function BackgroundBar() {
  return (
    <Box w="100%" h="20px" backgroundColor="#A0E7C8" position="absolute" borderRadius="100px"></Box>
  );
}

export default ProgressBar;
