import { useState, useEffect } from "react";
import { Flex, Text, VStack } from "@chakra-ui/layout";
import { FormControl, FormLabel, Input, Textarea } from "@chakra-ui/react";
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
import AddButton from "../../../flat/AddButton";
import PrimaryButton from "../../../flat/PrimaryButton";

interface FormValues {
  name: string;
  bio: string;
  commonQuestions: CommonQuestion[];
}

interface CommonQuestion {
  id?: string;
  body: string;
}

function ProfileDashboardTab() {
  const [name, setName] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [commonQuestions, setCommonQuestions] = useState<CommonQuestion[]>([
    {
      id: "0",
      body: "",
    },
  ]);

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

  function handleRemoveCommonQuestion(id: string) {
    let index = commonQuestions.findIndex((commonQuestion) => commonQuestion.id == id);
    let newCommonQuestions = [...commonQuestions];
    newCommonQuestions.splice(index, 1);
    setCommonQuestions(newCommonQuestions);
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
                          <Input
                            key={question.id}
                            size="lg"
                            id="commonQuestion"
                            placeholder="John Doe"
                            variant="filled"
                            isRequired
                            value={question.body}
                            onChange={(e) => onTextChange(e, question.id)}
                          />
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

export default ProfileDashboardTab;
