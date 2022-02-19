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
} from "@chakra-ui/react";
import { CloseButton } from "@chakra-ui/close-button";
import { Formik, Form, Field, FieldProps } from "formik";
import { v4 as uuidv4 } from "uuid";
import AddButton from "../../../flat/AddButton";
import PrimaryButton from "../../../flat/PrimaryButton";
import useChangeCommonQuestions from "../Profile/hooks/useChangeCommonQuestions";
import { RootState } from "../../../store";

interface CommonQuestion {
  id?: string;
  body: string;
}

function MetaTab() {
  const toast = useToast();
  const { user } = useSelector((state: RootState) => state.authentication);
  const commonQuestionsMutation = useChangeCommonQuestions();
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

  function handleSubmit() {
    let formattedCommonQuestion = commonQuestions.map(
      (commonQuestion) => commonQuestion.body
    );
    commonQuestionsMutation.mutate(formattedCommonQuestion);
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

  function handleRemoveCommonQuestion(id?: string) {
    let index = commonQuestions.findIndex(
      (commonQuestion) => commonQuestion.id == id
    );
    let newCommonQuestions = [...commonQuestions];
    newCommonQuestions.splice(index, 1);
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

  useEffect(() => {
    if (commonQuestionsMutation.isSuccess) {
      toast({
        title: "Meta data saved.",
        description: "Your changes to your meta data have been saved!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [commonQuestionsMutation.isSuccess]);

  return (
    <Flex flexFlow="column">
      <Formik
        initialValues={{
          commonQuestions: commonQuestions,
        }}
        onSubmit={(values, action) => {
          handleSubmit();
        }}
      >
        {() => {
          return (
            <Form
              style={{ display: "flex", flexFlow: "column", width: "100%" }}
            >
              <Field name="commonQuestions">
                {({ field, form }: FieldProps) => (
                  <FormControl
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

export default MetaTab;
