import { useMutation } from "react-query";
import axios from "axios";

interface FormData {
  response: "AC" | "DC";
}

function useRespondToInvitation(id: string) {
  const mutation = useMutation((data: FormData) => {
    const formData = new FormData();
    formData.append("response", data.response);

    return axios
      .post(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/respond_to_invitation/${id}/`,
        formData
      )
      .then((res) => {
        return res.data;
      });
  });

  return mutation;
}

export default useRespondToInvitation;
