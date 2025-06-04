import { createSlice, PayloadAction } from "@reduxjs/toolkit";
export interface EncateType {
  questionNumber: number;
  answer: string;
}

interface EncateState {
  list: EncateType[];
}

const initialState: EncateState = {
  list: [],
};

const encateSlice = createSlice({
  name: "encateResults",
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<EncateType[]>) => {
      state.list = action.payload;
    },
    clearItem: (state) => {
      state.list = [];
    },
  },
});

export const { addItem, clearItem } = encateSlice.actions;
export default encateSlice.reducer;
