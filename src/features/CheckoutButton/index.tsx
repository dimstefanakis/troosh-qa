import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Text } from "@chakra-ui/react";
import { Select } from "@chakra-ui/select";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import PrimaryButton from "../../flat/PrimaryButton";
import styles from "./CheckoutButton.module.css";
import axios from "axios";

interface CheckoutButtonProps {
  rate: number;
  mentor: any;
}

interface TimeSelectProps {
  timeNeeded: string;
  setTimeNeeded: React.Dispatch<React.SetStateAction<string>>;
}

function CheckoutButton({ rate, mentor }: CheckoutButtonProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState(null);
  const [timeNeeded, setTimeNeeded] = useState("15");
  const { question } = useSelector((state: RootState) => state.question);

  async function onCheckoutClick() {
    try {
      let formData = new FormData();
      formData.append(
        "qa_session_id",
        mentor.qa_sessions.find(
          (session: any) => session.minutes == parseInt(timeNeeded)
        ).surrogate
      );
      setLoading(true);
      let response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/create_qa_checkout_session/`,
        formData
      );
      setLoading(false);
      router.push(response.data.checkout_url);
    } catch (e) {
      console.error(e);
      setLoading(false);
    }
  }

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
        <TimeSelect timeNeeded={timeNeeded} setTimeNeeded={setTimeNeeded} />
        <PrimaryButton w="45%" isLoading={loading} onClick={onCheckoutClick}>
          Book for {" "}
          {
            mentor.qa_sessions.find(
              (session: any) => session.minutes == parseInt(timeNeeded)
            ).credit
          }
          €
        </PrimaryButton>
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
