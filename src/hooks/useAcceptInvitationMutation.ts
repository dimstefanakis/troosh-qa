import { useMutation } from "react-query";
import axios from "axios";

function useAcceptInvitationMutation(id: any) {
  const mutation = useMutation(() => {
    if (id) {
      return axios
        .post(`${process.env.NEXT_PUBLIC_API_URL}/v1/accept_invitation/${id}/`)
        .then((res) => {
          return res.data;
        });
    }
    return new Promise(() => {});
  });

  return mutation;
}

export default useAcceptInvitationMutation;
