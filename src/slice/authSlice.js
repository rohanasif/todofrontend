import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signUp: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    signIn: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
    signOut: (state, action) => {
      return {
        ...state,
        currentUser: null,
      };
    },
    setUser: (state, action) => {
      return {
        ...state,
        currentUser: action.payload,
      };
    },
  },
});

export const { signUp, signIn, signOut, setUser } = authSlice.actions;
export default authSlice.reducer;
