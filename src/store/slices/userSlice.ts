import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

export interface UserData {
  isAuth: boolean;
}

const initialState: UserData = {
  isAuth: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userAuth(state, actions: PayloadAction<boolean>) {
      state.isAuth = actions.payload;
    },
  },
});

export const { userAuth } = userSlice.actions;

export const selectUser = (state: RootState) => state.user;
export const selectIsAuth = (state: RootState) => state.user.isAuth;

export default userSlice.reducer;
