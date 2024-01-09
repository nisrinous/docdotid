import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  userRole: string;
  userId: number;
}

const authSlice = createSlice({
  name: "user",
  initialState: {} as AuthState,
  reducers: {
    setToken(state, action: PayloadAction<string>) {
      state.token = action.payload;
    },
    setUserRole(state, action: PayloadAction<string>) {
      state.userRole = action.payload;
    },
    setUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
  },
});

export const { setToken, setUserRole, setUserId } = authSlice.actions;
export default authSlice.reducer;
