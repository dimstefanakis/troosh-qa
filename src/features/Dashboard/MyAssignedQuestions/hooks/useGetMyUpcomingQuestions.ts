import { useQuery } from "react-query";
import axios from "axios";

function useGetMyUpcomingQuestions() {
  const query = useQuery(["useGetMyUpcomingQuestions"], async () => {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/my_upcoming_questions/`
    );
    return response.data;
  });

  return query;
}

export default useGetMyUpcomingQuestions;
