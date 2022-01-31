import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import useChangeAvailabilityTimeRanges from "./hooks/useChangeAvailabilityTimeRanges";
import { RootState } from "../../../store";
import AddButton from "../../../flat/AddButton";
import PrimaryButton from "../../../flat/PrimaryButton";
import days from "./days.json";

interface FormValues {
  name: string;
  bio: string;
  commonQuestions: CommonQuestion[];
}

interface CommonQuestion {
  id?: string;
  body: string;
}

interface AvailabilityTimeRange {
  id: any;
  weekday: number;
  start_time: string;
  end_time: string;
}

function fillZeros(value: string){
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

  const { user } = useSelector((state: RootState) => state.authentication);
  const availabilityMutation = useChangeAvailabilityTimeRanges();
  console.log("user", user);
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [availableTimeRanges, setAvailableTimeRanges] = useState<
    AvailabilityTimeRange[]
  >(
    user.coach.available_time_ranges
      ? user.coach.available_time_ranges
      : [
          {
            id: uuidv4(),
            weekday: 1,
            start_time: time,
            end_time: time,
          },
        ]
  );
  const [name, setName] = useState<string>(user.subscriber.name);
  const [bio, setBio] = useState<string>(user.coach.bio);
  const [commonQuestions, setCommonQuestions] = useState<CommonQuestion[]>(
    user.coach.common_questions
      ? user.coach.common_questions.map((question: any) => ({
          id: question.surrogate,
          body: question.body,
        }))
      : [
          {
            id: "0",
            body: "",
          },
        ]
  );

  console.log("availableTimeRanges", availableTimeRanges);
  useEffect(() => {
    if (user) {
      setName(user.name);
      setBio(user.bio);
      setAvailableTimeRanges(user.coach.available_time_ranges);
    }
  }, [user]);

  function handleSubmit(values: FormValues) {
    console.log("values", values);
  }

  function onTextChange(e: React.ChangeEvent<HTMLInputElement>, id?: string) {
    let newCommonQuestions = [...commonQuestions];
    const foundCommonQuestion = newCommonQuestions.find(
      (question) => question.id == id
    );
    if (foundCommonQuestion) {
      foundCommonQuestion.body = e.currentTarget.value;
    }
    setCommonQuestions(newCommonQuestions);
  }

  function onNewCommonQuestionClick() {
    let newCommonQuestions = [...commonQuestions];
    newCommonQuestions.push({
      id: uuidv4(),
      body: "",
    });
    setCommonQuestions(newCommonQuestions);
  }

  function handleRemoveCommonQuestion(id?: string) {
    let index = commonQuestions.findIndex(
      (commonQuestion) => commonQuestion.id == id
    );
    let newCommonQuestions = [...commonQuestions];
    newCommonQuestions.splice(index, 1);
    setCommonQuestions(newCommonQuestions);
  }

  function handleDayChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedDay(parseInt(event.target.value));
  }

  function onTimeChange(
    e: React.ChangeEvent<HTMLInputElement>,
    id: string,
    range: string
  ) {
    // getting readonly errors so I have to reassign properties often
    let newAvailabilityTimeRanges = [...availableTimeRanges];
    const foundTimeRangeIndex = newAvailabilityTimeRanges.findIndex(
      (timeRange) => timeRange.id == id
    );
    if (foundTimeRangeIndex != -1) {
      let item = { ...newAvailabilityTimeRanges[foundTimeRangeIndex] };
      let value = fillZeros(e.currentTarget.value);
      if(parseInt(value.slice(0, 2)) > 24 || parseInt(value.slice(3)) > 59){
        return
      }
      if (range == "start") {
        item.start_time = value;
      } else {
        item.end_time = value;
      }
      newAvailabilityTimeRanges[foundTimeRangeIndex] = item;
    }
    setAvailableTimeRanges(newAvailabilityTimeRanges);
  }

  function onTimeRangeRemove(id: string) {
    let index = availableTimeRanges.findIndex(
      (timeRange) => timeRange.id == id
    );
    let newTimeRanges = [...availableTimeRanges];
    newTimeRanges.splice(index, 1);
    setAvailableTimeRanges(newTimeRanges);
  }

  function onNewTimeRangeClick() {
    let newTimeRanges = [...availableTimeRanges];
    newTimeRanges.push({
      id: uuidv4(),
      weekday: 1,
      start_time: '',
      end_time: '',
    });
    setAvailableTimeRanges(newTimeRanges);
  }

  return (
    <Flex flexFlow="column">
      <Formik
        initialValues={{
          name: name,
          bio: bio,
          commonQuestions: commonQuestions,
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
              <Field name="commonQuestions">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    mt={6}
                    isInvalid={!!(form.errors.name && form.touched.name)}
                  >
                    <FormLabel htmlFor="commonQuestions">
                      Common questions
                    </FormLabel>
                    <VStack>
                      {commonQuestions.map((question) => {
                        return (
                          <InputGroup key={question.id} alignItems="center">
                            <Input
                              size="lg"
                              id="commonQuestion"
                              placeholder="John Doe"
                              variant="filled"
                              isRequired
                              value={question.body}
                              onChange={(e) => onTextChange(e, question.id)}
                            />
                            {commonQuestions.length > 1 && (
                              <InputRightElement top="inherit">
                                <CloseButton
                                  onClick={() =>
                                    handleRemoveCommonQuestion(question.id)
                                  }
                                />
                              </InputRightElement>
                            )}
                          </InputGroup>
                        );
                      })}
                    </VStack>
                    <Flex
                      w="100%"
                      justifyContent="center"
                      alignItems="center"
                      mt={3}
                    >
                      <AddButton onClick={onNewCommonQuestionClick} />
                    </Flex>
                    {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                  </FormControl>
                )}
              </Field>

              <FormLabel htmlFor="availability">Availability</FormLabel>

              <Select
                placeholder="Select option"
                defaultValue="1"
                onChange={handleDayChange}
              >
                {days.map((day) => {
                  return <option value={day.value}>{day.label}</option>;
                })}
              </Select>
              <VStack mt={3}>
                {availableTimeRanges
                  .filter(
                    (timeRange: AvailabilityTimeRange) =>
                      timeRange.weekday == selectedDay
                  )
                  .map((timeRange: AvailabilityTimeRange, i: number) => {
                    return (
                      <HStack key={i}>
                        <InputGroup alignItems="center">
                          <Input
                            as={InputMask}
                            mask="**:**"
                            onChange={(e) =>
                              onTimeChange(e, timeRange.id, "start")
                            }
                            size="lg"
                            id="timeRangeStart"
                            placeholder="John Doe"
                            variant="filled"
                            isRequired
                            value={timeRange.start_time}
                            // @ts-ignore:next-line
                            maskChar=""
                          />
                        </InputGroup>
                        <Text>to</Text>
                        <InputGroup alignItems="center">
                          <Input
                            as={InputMask}
                            mask="**:**"
                            onChange={(e) =>
                              onTimeChange(e, timeRange.id, "end")
                            }
                            size="lg"
                            id="timeRangeEnd"
                            placeholder="John Doe"
                            variant="filled"
                            isRequired
                            value={timeRange.end_time}
                            // @ts-ignore:next-line
                            maskChar=""
                          />
                          <InputRightElement top="inherit">
                            <CloseButton
                              onClick={() => onTimeRangeRemove(timeRange.id)}
                            />
                          </InputRightElement>
                        </InputGroup>
                      </HStack>
                    );
                  })}
                <Flex
                  w="100%"
                  justifyContent="center"
                  alignItems="center"
                  mt={6}
                >
                  <AddButton onClick={onNewTimeRangeClick} />
                </Flex>
              </VStack>
              <PrimaryButton mt={10} type="submit">
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
