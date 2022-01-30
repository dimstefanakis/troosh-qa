import { useMutation } from "react-query";
import axios from "axios";

function useChangeAvailabilityTimeRanges() {
  const mutation = useMutation((data: any) => {
    return axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/change_availability_time_ranges/`,
      data
    );
  });

  return mutation;
}

export default useChangeAvailabilityTimeRanges;
