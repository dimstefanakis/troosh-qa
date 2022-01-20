import { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PrimaryButton from "../../flat/PrimaryButton";
import styles from "./CheckoutButton.module.css";

interface CheckoutButtonProps {
  rate: number;
}

interface TimeSelectProps {
  timeNeeded: string;
  setTimeNeeded: React.Dispatch<React.SetStateAction<string>>
}

function CheckoutButton({ rate }: CheckoutButtonProps) {
  const [timeNeeded, setTimeNeeded] = useState('15');
  const { question } = useSelector((state: RootState) => state.question);

  if (!question) {
    return null;
  }

  return (
    <Flex
      w="100%"
      p={5}
      borderRadius="10px"
      flexFlow="column"
      className={styles.checkoutContainer}
    >
      <Text>{question}</Text>
      <Flex justifyContent="center" alignItems="center" mt={10}>
        <TimeSelect timeNeeded={timeNeeded} setTimeNeeded={setTimeNeeded}/>
        <PrimaryButton w="45%">Book for ${parseInt(timeNeeded)*rate/60}</PrimaryButton>
      </Flex>
    </Flex>
  );
}

function TimeSelect({ timeNeeded, setTimeNeeded }: TimeSelectProps) {
  
  function handleTimeChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setTimeNeeded(e.target.value);
  }

  return (
    <Select w="45%" onChange={handleTimeChange}>
      <option value="15">I need 15 minutes</option>
      <option value="30">I need 30 minutes</option>
      <option value="45">I need 45 minutes</option>
      <option value="60">I need 60 minutes</option>
    </Select>
  );
}

export default CheckoutButton;
