export interface QuestionInterface {
  body: string;
  id?: string;
  answer_needed_now?: boolean;
}

export interface GetAvailableMentorsData {
  expertise?: string;
}
