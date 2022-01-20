import { createSlice } from "@reduxjs/toolkit";

export const progressSlice = createSlice({
  name: "progress",
  initialState: {
    currentStep: 0,
  },
  reducers: {
    incrementStep: (state, action) => {
      state.currentStep += 1;
    },
    decrementStep: (state, action) => {
      state.currentStep -= 1;
    },
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
  },
});

export const { incrementStep, decrementStep, setStep } = progressSlice.actions;
