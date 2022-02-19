import { useQuery } from "react-query";
import axios from "axios";

function useGetMyAssignedQuestions(){
  const query = useQuery(["useGetMyAssignedQuestions"], async () => {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/my_assigned_questions/`
    );
    return response.data;
  });

  return query;

}

export default useGetMyAssignedQuestions;
