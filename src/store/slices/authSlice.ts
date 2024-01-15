import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  userRole: string;
  userId: number;
  fixLat: number;
  fixLng: number;
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
    deleteUser: (state) => {
      state.token = "";
      state.userRole = "";
      state.userId = 0;
    },
    setFixLat(state, action: PayloadAction<number>) {
      state.fixLat = action.payload;
    },
    setFixLng(state, action: PayloadAction<number>) {
      state.fixLng = action.payload;
    },
  },
});

export const { setToken, setUserRole, setUserId, setFixLat, setFixLng } =
  authSlice.actions;
export default authSlice.reducer;
