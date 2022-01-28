import { useQuery } from "@chakra-ui/media-query";
import { useMutation } from "react-query";
import { QuestionInterface } from "../interface";
import axios from "axios";

interface CreateQuestionInput{
  body: string;
  when: string;
}

function useCreateQuestion() {
  const mutation = useMutation((data: CreateQuestionInput) => {
    const formData = new FormData();
    formData.append("body", data.body);
    formData.append("when", data.when);

    return axios
      .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/ask_question/`, formData)
      .then((res) => {
        return res.data;
      });
  });

  return mutation;
}

export default useCreateQuestion;
