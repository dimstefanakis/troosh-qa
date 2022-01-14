import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export const questionSlice = createSlice({
  name: "question",
  initialState: {
    question: null,
  },
  reducers: {
    setQuestion: (state, action) => {
      state.question = action.payload;
    },
  },
});

export const { setQuestion } = questionSlice.actions;
