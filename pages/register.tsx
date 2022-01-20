import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Flex, Text, Heading } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/form-control";
import { Input } from "@chakra-ui/input";
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
import { Button } from "@chakra-ui/button";
import { useToast } from "@chakra-ui/toast";
import PrimaryButton from "../src/flat/PrimaryButton";
import { RootState } from "../src/store";
import { register } from "../src/features/Authentication/authenticationSlice";

interface FormValues {
  email: string;
  password1: string;
  password2: string;
}

interface RegisterCredentials {
  email: string;
  password1: string;
  password2: string;
}

function Register() {
  const { loading, token } = useSelector(
    (state: RootState) => state.authentication
  );
  const dispatch = useDispatch();
  const toast = useToast();

  function validateName(value: string) {
    let error;
    if (!value) {
      error = "Name is required";
    } else if (value.toLowerCase() !== "naruto") {
      error = "Jeez! You're not a fan 😱";
    }
    return error;
  }

  async function performRegister(data: RegisterCredentials) {
    dispatch(
      register({
        email: data.email,
        password1: data.password1,
        password2: data.password2,
      })
    );
  }

  useEffect(() => {
    if (token) {
      toast({
        title: "You are logged in!",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
    }
  }, [token]);

  return (
    <Flex
      w="100%"
      flexFlow="column"
      justifyContent="center"
      alignItems="center"
    >
      <Text as="h1" fontSize="4xl" fontWeight="bold" mb={10}>
        Create mentor account
      </Text>
      <Formik
        initialValues={{ email: "", password1: "", password2: "" }}
        onSubmit={(values, actions) => {
          performRegister(values);
        }}
      >
        {(props: FormikProps<FormValues>) => {
          const { touched, errors, isSubmitting } = props;
          return (
            <Form
              className="container"
              style={{ display: "flex", flexFlow: "column" }}
            >
              <Field name="email">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!(form.errors.name && form.touched.name)}
                  >
                    {/* <FormLabel htmlFor="email">Email</FormLabel> */}
                    <Input
                      {...field}
                      mt={10}
                      size="lg"
                      id="email"
                      placeholder="Enter email"
                      variant="filled"
                      isRequired
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password1">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!(form.errors.name && form.touched.name)}
                  >
                    <Input
                      {...field}
                      mt={3}
                      size="lg"
                      type="password"
                      id="password1"
                      placeholder="Enter password"
                      variant="filled"
                      isRequired
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password2">
                {({ field, form }: FieldProps) => (
                  <FormControl
                    isInvalid={!!(form.errors.name && form.touched.name)}
                  >
                    <Input
                      {...field}
                      mt={3}
                      size="lg"
                      type="password"
                      id="password2"
                      placeholder="Enter password again"
                      variant="filled"
                      isRequired
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <PrimaryButton mt={10} isLoading={loading} type="submit">
                Register
              </PrimaryButton>
            </Form>
          );
        }}
      </Formik>
    </Flex>
  );
}

export default Register;
