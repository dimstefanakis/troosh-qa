import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface QuestionStateInterface {
  question: string;
}

export const questionSlice = createSlice({
  name: "question",
  initialState: <QuestionStateInterface>{
    question: '',
  },
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
});

export const { setQuestion } = questionSlice.actions;
