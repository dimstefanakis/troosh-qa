import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useToast } from "@chakra-ui/toast";
import { Flex, Text, VStack, HStack } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Textarea,
  Select,
} from "@chakra-ui/react";
import {
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/close-button";
import {
  Formik,
  Form,
  Field,
  FieldProps,
  FormikFormProps,
  FormikProps,
  FormikValues,
  FieldInputProps,
} from "formik";
import InputMask from "react-input-mask";
import { v4 as uuidv4 } from "uuid";
import useChangeSubscriberProfile from "./hooks/useChangeSubscriberProfile";
import useChangeMentorProfile from "./hooks/useChangeMentorProfile";
import useChangeAvailabilityTimeRanges from "./hooks/useChangeAvailabilityTimeRanges";
import useChangeCommonQuestions from "./hooks/useChangeCommonQuestions";
import { RootState } from "../../../store";
import AddButton from "../../../flat/AddButton";
import PrimaryButton from "../../../flat/PrimaryButton";
import days from "./days.json";

interface FormValues {
  name: string;
  bio: string;
  rate: string;
}

function fillZeros(value: string) {
  value = value.replaceAll(":", "");
  value = value + "0".repeat(4 - value.length);

  // add a : every 2 characters
  value = value.replace(/(.{2})/g, "$1:");

  // remove the last :
  value = value.substring(0, value.length - 1);

  return value;
}

function ProfileDashboardTab() {
  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const toast = useToast();
  const { user } = useSelector((state: RootState) => state.authentication);
  const subscriberMutation = useChangeSubscriberProfile();
  const mentorMutation = useChangeMentorProfile(user.coach?.surrogate);
  const [name, setName] = useState<string>(user.subscriber.name);
  const [bio, setBio] = useState<string>(user.coach.bio);
  const [rate, setRate] = useState<string>(user.coach.qa_session_credit);

  useEffect(() => {
    if (user) {
      setName(user.subscriber.name);
      setBio(user.coach.bio);
      setRate(user.coach.qa_session_credit);
    }
  }, [user]);

  function handleSubmit(values: FormValues) {
    let subscriberFormData = new FormData();
    subscriberFormData.append("name", values.name);
    subscriberMutation.mutate(subscriberFormData);

    if (user.coach) {
      let mentorFormData = new FormData();
      mentorFormData.append("bio", values.bio);
      mentorFormData.append("qa_session_credit", rate.toString());
      mentorMutation.mutate(mentorFormData);
    }
  }

  useEffect(() => {
    if (mentorMutation.isSuccess && subscriberMutation.isSuccess) {
      toast({
        title: "Profile saved.",
        description: "Your changes have been saved!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [mentorMutation.isSuccess, subscriberMutation.isSuccess]);
  
  function handleRateChange(valueAsString: string, valueAsNumber: number) {
    setRate(valueAsString);
  }

  console.log("date", rate)

  return (
    <Flex flexFlow="column">
      <Formik
        initialValues={{
          name: name,
          bio: bio,
          rate: rate,
        }}
        onSubmit={(values, action) => {
          handleSubmit(values);
        }}
      >
        {(props: FormikProps<FormValues>) => {
          const { touched, errors, isSubmitting } = props;
          return (
            <Form
              style={{ display: "flex", flexFlow: "column", width: "100%" }}
            >
              <Field name="name">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!(form.errors.name && form.touched.name)}
                  >
                    <FormLabel htmlFor="name">Name</FormLabel>
                    <Input
                      {...field}
                      size="lg"
                      id="name"
                      placeholder="John Doe"
                      variant="filled"
                      isRequired
                    />
                    {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                  </FormControl>
                )}
              </Field>
              <Field name="bio">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    mt={6}
                    isInvalid={!!(form.errors.name && form.touched.name)}
                  >
                    <FormLabel htmlFor="bio">Bio</FormLabel>
                    <Textarea
                      {...field}
                      minH="160px"
                      maxLength={160}
                      size="lg"
                      id="bio"
                      placeholder="Some info about you and what you do"
                      variant="filled"
                      isRequired
                    />
                    {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                  </FormControl>
                )}
              </Field>
              <FormLabel htmlFor="rate" mt={6}>
                Rate per 30 minutes (in EUR€)
              </FormLabel>
              <Field name="rate">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!(form.errors.name && form.touched.name)}
                  >
                    <NumberInput
                      {...field}
                      id="rate"
                      placeholder="15€"
                      value={rate}
                      onChange={handleRateChange}
                      isRequired
                    >
                      <NumberInputField />
                    </NumberInput>
                    {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                  </FormControl>
                )}
              </Field>
              <PrimaryButton
                mt={10}
                isLoading={
                  subscriberMutation.isLoading || mentorMutation.isLoading
                }
                type="submit"
              >
                Save
              </PrimaryButton>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
}

export default ProfileDashboardTab;
