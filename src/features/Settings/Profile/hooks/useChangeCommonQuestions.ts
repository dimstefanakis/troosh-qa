import { useMutation } from "react-query";
import axios from "axios";

function useChangeCommonQuestions() {
  const mutation = useMutation((data: any) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/change_common_questions/`,
      data
    );
  });

  return mutation;
}

export default useChangeCommonQuestions;
