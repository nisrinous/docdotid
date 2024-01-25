import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string;
  user_id: number;
  personal_id: number;
  role_id: number;
  email: string;
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
    setUserId(state, action: PayloadAction<number>) {
      state.user_id = action.payload;
    },
    setPersonalId(state, action: PayloadAction<number>) {
      state.personal_id = action.payload;
    },
    setRoleId(state, action: PayloadAction<number>) {
      state.role_id = action.payload;
    },
    setEmail(state, action: PayloadAction<string>) {
      state.email = action.payload;
    },
    deleteUser: (state) => {
      state.token = "";
      state.user_id = 0;
      state.personal_id = 0;
      state.role_id = 0;
      state.email = "";
    },
    setFixLat(state, action: PayloadAction<number>) {
      state.fixLat = action.payload;
    },
    setFixLng(state, action: PayloadAction<number>) {
      state.fixLng = action.payload;
    },
  },
});

export const {
  setToken,
  setRoleId,
  setPersonalId,
  setUserId,
  setEmail,
  deleteUser,
  setFixLat,
  setFixLng,
} = authSlice.actions;
export default authSlice.reducer;
