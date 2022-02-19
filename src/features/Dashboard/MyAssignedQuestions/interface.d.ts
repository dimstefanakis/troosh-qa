import { UseQueryResult } from "react-query";

export interface MyAssignedQuestionsProps {
  type: "upcoming" | "archived";
  query: UseQueryResult<any, any>;
}
