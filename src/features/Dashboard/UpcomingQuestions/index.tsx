import MyAssignedQuestions from "../MyAssignedQuestions";
import useGetMyUpcomingQuestions from "../MyAssignedQuestions/hooks/useGetMyUpcomingQuestions";

function UpcomingQuestions() {
  const query = useGetMyUpcomingQuestions();

  return <MyAssignedQuestions query={query} type="upcoming" />;
}

export default UpcomingQuestions;
