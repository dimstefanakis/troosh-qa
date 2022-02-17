import { useQuery } from "react-query";
import axios from "axios";

function useGetStripeOnboardLink() {
  const query = useQuery(["getStripeOnboardLink"], async () => {
    try {
      let response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/create_stripe_account_link/`
      );
      return response.data;
    } catch (e) {
      console.error(e);
    }
  });

  return query;
}

export default useGetStripeOnboardLink;
