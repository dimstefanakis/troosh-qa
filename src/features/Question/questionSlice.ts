import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionStateInterface {
  question: QuestionInterface;
}

interface QuestionInterface {
  body: string;
  id?: string;
}

export const questionSlice = createSlice({
  name: "question",
  initialState: <QuestionStateInterface>{
    question: {
      body: "",
      id: "",
    },
  },
  reducers: {
    setQuestion: (state, action) => {
      state.question = {...state.question, ...action.payload}
    },
  },
});

export const { setQuestion } = questionSlice.actions;
