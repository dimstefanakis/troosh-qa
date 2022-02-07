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
import { motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import styles from './ProgressBar.module.css';

interface StepDotProps {
  step: number;
  StepPopover?: JSX.Element;
}

interface StepPopoverProps {
  header: string;
  body: string;
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
        <StepDot step={0} StepPopover={<StepAskPopover />} />
        <StepDot step={1} StepPopover={<StepSelectTimePopover />} />
        <StepDot step={2} StepPopover={<StepFinishPopover />} />
      </Flex>
    </Flex>
  );
}

function StepDot({ step, StepPopover }: StepDotProps) {
  const { currentStep } = useSelector((state: RootState) => state.progress);

  return (
    <Popover trigger="hover">
      <PopoverTrigger>
        <motion.div
          style={{ height: 25, width: 25, zIndex: 1 }}
          whileHover={{
            scale: 1.2,
            transition: { duration: 0.2 },
          }}
        >
          <Box
            className={styles.dot}
            h="100%"
            w="100%"
            backgroundColor={step <= currentStep ? "#FFD29B" : "white"}
            borderRadius="100%"
            border={`5px solid ${step <= currentStep ? "#FFD29B" : "#AAF0D1"}`}
          ></Box>
        </motion.div>
      </PopoverTrigger>
      {StepPopover}
    </Popover>
  );
}

function BackgroundBar() {
  return (
    <Box
      w="100%"
      h="20px"
      backgroundColor="#A0E7C8"
      position="absolute"
      borderRadius="100px"
    ></Box>
  );
}

function StepPopover({ header, body }: StepPopoverProps) {
  return (
    <PopoverContent>
      <PopoverArrow />
      <PopoverCloseButton />
      <PopoverHeader>{header}</PopoverHeader>
      <PopoverBody>{body}</PopoverBody>
    </PopoverContent>
  );
}

function StepAskPopover() {
  return (
    <StepPopover
      header="Ask a question"
      body="You can be as specific as you want. Ideally the question should be specifically tailored to your needs!"
    />
  );
}

function StepSelectTimePopover() {
  return (
    <StepPopover
      header="When do you need an answer?"
      body="Select the time you want your question to be answered. Mentors will be notified and all available mentors will be shown here!"
    />
  );
}

function StepFinishPopover() {
  return (
    <StepPopover
      header="Get ready for an answer!"
      body="Select the mentor you think suits your needs the most and book a call with them to get your question answered!"
    />
  );
}

export default ProgressBar;
