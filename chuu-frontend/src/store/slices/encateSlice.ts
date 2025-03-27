import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Encate {
  questionNumber: number;
  answer: string;
}

interface EncateState {
  list: Encate[];
}

const initialState: EncateState = {
  list: [],
};

const encateSlice = createSlice({
  name: "encateResults",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<Encate>) => {
      state.list.push(action.payload);
    },
    clearItem: (state) => {
      state.list = [];
    },
  },
});

export const { addItem, clearItem } = encateSlice.actions;
export default encateSlice.reducer;
