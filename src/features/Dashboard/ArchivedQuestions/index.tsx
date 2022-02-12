import MyAssignedQuestions from "../MyAssignedQuestions";
import useGetMyArchivedQuestions from "../MyAssignedQuestions/useGetMyArchivedQuestions";

function ArchivedQuestions() {
  const query = useGetMyArchivedQuestions();

  return <MyAssignedQuestions query={query} type="archived" />;
}

export default ArchivedQuestions;
