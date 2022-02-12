import { useMutation } from "react-query";
import axios from "axios";

function useChangeMentorProfile(id?: string) {
  const mutation = useMutation((data: any) => {
    return axios.patch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/coaches/${id}/`,
      data
    );
  });

  return mutation;
}

export default useChangeMentorProfile;
