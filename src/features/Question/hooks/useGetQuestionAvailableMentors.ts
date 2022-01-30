import { useQuery } from "react-query";
import axios from "axios";

function useGetQuestionAvailableMentors(id?: string) {
  const query = useQuery(["getQuestionAvailableMentors", id], async () => {
    if (id) {
      try {
        let response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/check_available_coaches_for_question/${id}/`
        );
        return response.data;
      } catch (e) {
        console.error(e);
      }
    }
  });

  return query;
}

export default useGetQuestionAvailableMentors;
