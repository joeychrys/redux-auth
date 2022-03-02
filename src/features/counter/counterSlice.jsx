import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: 0,
};

export const counterSlice = createSlice({
  name: "counter",
  initialState: initialState,
  reducers: {
    addOne: (state) => {
      state.value += 1;
    },
  },
});

// This is the action export
export const { addOne } = counterSlice.actions;

// This is the selector export
export const selectCount = (state) => state.counter.value;

// This exports the reducer for the store to use
export default counterSlice.reducer;