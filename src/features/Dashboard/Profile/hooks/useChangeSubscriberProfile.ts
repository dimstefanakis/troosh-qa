import { useMutation } from "react-query";
import axios from "axios";

function useChangeSubscriberProfile() {
  const mutation = useMutation((data: any) => {
    return axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/subscriber/me/`,
    //   {
    //     headers: {
    //       "content-type": "multipart/form-data",
    //     },
    //   },

      data
    );
  });

  return mutation;
}

export default useChangeSubscriberProfile;
