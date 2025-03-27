import { configureStore } from "@reduxjs/toolkit";
import encateReducer from "./slices/encateSlice.ts";

export const store = configureStore({
  reducer: {
    encate: encateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
