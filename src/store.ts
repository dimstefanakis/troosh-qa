import { configureStore } from "@reduxjs/toolkit";
import { questionSlice } from "./features/Question/questionSlice";
import { progressSlice } from "./features/Progress/progressSlice";
import { authenticationSlice } from "./features/Authentication/authenticationSlice";

export const store = configureStore({
  reducer: {
    question: questionSlice.reducer,
    progress: progressSlice.reducer,
    authentication: authenticationSlice.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
