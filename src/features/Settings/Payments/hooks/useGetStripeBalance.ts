import { useQuery } from "react-query";
import axios from "axios";

function useGetStripeBalance(user: any) {
  const query = useQuery(["getStripeBalance", user], async () => {
    if (user.coach.charges_enabled) {
      try {
        let response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/get_stripe_balance/`
        );
        return response.data;
      } catch (e) {
        console.error(e);
      }
    }
  });

  return query;
}

export default useGetStripeBalance;
