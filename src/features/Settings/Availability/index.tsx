import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Flex, Text, VStack, HStack } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
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
import useChangeAvailabilityTimeRanges from "../Profile/hooks/useChangeAvailabilityTimeRanges";
import { RootState } from "../../../store";
import AddButton from "../../../flat/AddButton";
import PrimaryButton from "../../../flat/PrimaryButton";
import { v4 as uuidv4 } from "uuid";
import days from "./days.json";

interface AvailabilityTimeRange {
  id: any;
  weekday: number;
  start_time: string;
  end_time: string;
}

function AvailabilityTab() {
  let today = new Date();
  let time =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const toast = useToast();
  const { user } = useSelector((state: RootState) => state.authentication);
  const availabilityMutation = useChangeAvailabilityTimeRanges();
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

  useEffect(() => {
    if (user) {
      setAvailableTimeRanges(user.coach.available_time_ranges);
    }
  }, [user]);

  function handleSubmit() {
    let formattedTimeRanges = availableTimeRanges
      .filter((timeRange) => {
        return timeRange.end_time && timeRange.start_time;
      })
      .map((timeRange) => {
        let formattedTimeRange = { ...timeRange };
        if (formattedTimeRange.end_time.length <= 5) {
          formattedTimeRange.end_time += ":00";
        }
        if (formattedTimeRange.start_time.length <= 5) {
          formattedTimeRange.start_time += ":00";
        }
        return formattedTimeRange;
      });
    let timeRangeDate = {
      availability_ranges: formattedTimeRanges,
    };
    availabilityMutation.mutate(timeRangeDate);
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
      // let value = fillZeros(e.currentTarget.value);
      // if (parseInt(value.slice(0, 2)) > 24 || parseInt(value.slice(3)) > 59) {
      //   // check this for better UX
      //   // https://stackoverflow.com/questions/52846347/reactjs-cannot-restrict-user-input-to-letters-only/52846409
      //   e.preventDefault();
      //   return false;
      // }
      if (range == "start") {
        item.start_time = e.currentTarget.value;
      } else {
        item.end_time = e.currentTarget.value;
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
      weekday: selectedDay,
      start_time: "",
      end_time: "",
    });
    setAvailableTimeRanges(newTimeRanges);
  }

  useEffect(() => {
    if (availabilityMutation.isSuccess) {
      toast({
        title: "Availability saved.",
        description: "Your changes to your availability have been saved!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [availabilityMutation.isSuccess]);

  return (
    <Flex flexFlow="column">
      <Formik
        initialValues={{}}
        onSubmit={(values, action) => {
          handleSubmit();
        }}
      >
        {() => {
          return (
            <Form
              style={{ display: "flex", flexFlow: "column", width: "100%" }}
            >
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
                      <HStack key={i} w="100%">
                        <InputGroup alignItems="center">
                          <Input
                            type="time"
                            onChange={(e) =>
                              onTimeChange(e, timeRange.id, "start")
                            }
                            size="lg"
                            id="timeRangeStart"
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
                            type="time"
                            onChange={(e) =>
                              onTimeChange(e, timeRange.id, "end")
                            }
                            size="lg"
                            id="timeRangeEnd"
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
              <PrimaryButton
                mt={10}
                type="submit"
                isLoading={availabilityMutation.isLoading}
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

export default AvailabilityTab;
