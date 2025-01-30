import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface User {
    username: string;
    password: string;
    email: string;
    fullName: string;
    id?:string;
    token?:string;
}



interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  token: localStorage.getItem("token") || null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    signInRequest: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    // signInSuccess: (state, action: PayloadAction<{ user: any; token: string }>) => {
    //   state.user = action.payload.user;
    //   state.token = action.payload.token;
    //   state.loading = false;
    //   localStorage.setItem("token", action.payload.token);
    // },

    // signInSuccess: (state, action: PayloadAction<{ user: any; }>) => {
    //     state.user = action.payload.user;
    //     state.token = action.payload.user.token;
    //     state.loading = false;
    //     localStorage.setItem("token", action.payload.user.token);
    //   },

      signInSuccess: (state, action: PayloadAction<{ user: User; }>) => {
        state.user = action.payload.user;
        state.token = action.payload.user.token? action.payload.user.token : null;
        state.loading = false;
        localStorage.setItem("token", action.payload.user.token? action.payload.user.token : "");
      },
    signInFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    signUpRequest: (state, action: PayloadAction<{ username: string; password: string }>) => {
      state.loading = true;
      state.error = null;
    },
    // signUpSuccess: (state, action: PayloadAction<{ user: any; token: string }>) => {
    //   state.user = action.payload.user;
    //   state.token = action.payload.token;
    //   state.loading = false;
    //   localStorage.setItem("token", action.payload.token);
    // },
    signUpSuccess: (state, action: PayloadAction<{ user: User; }>) => {
        state.user = action.payload.user;
        state.token = action.payload.user.token? action.payload.user.token : null;
        state.loading = false;
        localStorage.setItem("token",action.payload.user.token? action.payload.user.token : "");
      },
    signUpFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },
});

export const {
  signInRequest,
  signInSuccess,
  signInFailure,
  signUpRequest,
  signUpSuccess,
  signUpFailure,
  logout,
} = authSlice.actions;

export default authSlice.reducer;
