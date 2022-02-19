import { useQuery } from "react-query";
import axios from "axios";

function useGetMyArchivedQuestions() {
  const query = useQuery(["useGetMyArchivedQuestions"], async () => {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/my_archived_questions/`
    );
    return response.data;
  });

  return query;
}

export default useGetMyArchivedQuestions;
