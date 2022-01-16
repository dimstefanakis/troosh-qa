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
    <Flex justifyContent="center" alignItems="center" w="100%" h="25px" position="relative">
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
      h="20px"
      w="20px"
      backgroundColor={step == currentStep ? "orange" : "gray"}
      border={`5px solid ${step == currentStep ? "orange" : "gray"}`}
    ></Box>
  );
}

function BackgroundBar() {
  return (
    <Box w="100%" h="20px" backgroundColor="#A0E7C8" position="absolute"></Box>
  );
}

export default ProgressBar;
