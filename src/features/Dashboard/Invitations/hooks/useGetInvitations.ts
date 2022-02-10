import { useQuery } from "react-query";
import axios from "axios";

function useGetInvitations() {
  const query = useQuery(["useGetInvitations"], async () => {
    let response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/my_qa_invitations/`
    );
    return response.data;
  });

  return query;
}

export default useGetInvitations;
