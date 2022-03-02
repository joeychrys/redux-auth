import { createSlice } from "@reduxjs/toolkit";
import usernameAction from "./usernameAction";

const initialState = {
  username: "",
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  extraReducers: (builder) => {
    builder.addCase(usernameAction.fulfilled, (state, action) => {
      state.username = action.payload;
    });
  },
});

export const selectUsername = (state) => state.user.username;

export default userSlice.reducer;
