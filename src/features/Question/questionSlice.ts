import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionStateInterface {
  question: QuestionInterface;
}

interface QuestionInterface {
  body: string;
  initial_delivery_time: string;
  answer_needed_now?: boolean;
  id?: string;
}

export const questionSlice = createSlice({
  name: "question",
  initialState: <QuestionStateInterface>{
    question: {
      body: "",
      initial_delivery_time: "",
      id: "",
    },
  },
  reducers: {
    setQuestion: (state, action) => {
      state.question = { ...state.question, ...action.payload };
    },
  },
});

export const { setQuestion } = questionSlice.actions;
