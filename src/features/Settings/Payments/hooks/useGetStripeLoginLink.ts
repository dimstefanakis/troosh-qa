import { useQuery } from "react-query";
import axios from "axios";

function useGetStripeLoginLink(user: any) {
  const query = useQuery(["getStripeLoginLink", user], async () => {
    if (user.coach.charges_enabled) {
      try {
        let response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/v1/get_stripe_login_link/`
        );
        return response.data;
      } catch (e) {
        console.error(e);
      }
    }
  });

  return query;
}

export default useGetStripeLoginLink;
