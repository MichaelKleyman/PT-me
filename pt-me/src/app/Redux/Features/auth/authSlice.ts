'use client';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Axios from 'axios';
import { CLIENT, BASE_URL } from '@/components/api';

const TOKEN = 'token';

interface AuthState {
  user: any; // Replace 'any' with your user type
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  error: null,
};

interface SignupPayload {
  clinicName: string;
  address: string;
  email: string;
  password: string;
}
interface LoginPayload {
  email: string;
  password: string;
}

export const me = createAsyncThunk(
  `${BASE_URL}/auth/me`,
  async (_, { dispatch }) => {
    const token = window.localStorage.getItem(TOKEN);
    if (token) {
      const res = await CLIENT.get(`${BASE_URL}/auth/me`, {
        headers: {
          authorization: token,
        },
      });
      return res.data;
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async (
    { clinicName, address, email, password }: SignupPayload,
    { dispatch }
  ) => {
    try {
      const res = await CLIENT.post(`${BASE_URL}/auth/signup`, {
        clinicName,
        address,
        email,
        password,
      });
      console.log(res);
      window.localStorage.setItem(TOKEN, res.data.token);
      await dispatch(me());
      return { error: 'Successful signup' };
    } catch (authError: any) {
      return { error: authError.response.data };
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }: LoginPayload, { dispatch }) => {
    try {
      const res = await CLIENT.post(`${BASE_URL}/auth/login`, {
        email,
        password,
      });
      window.localStorage.setItem(TOKEN, res.data.token);
      await dispatch(me());
    } catch (authError: any) {
      console.log('>>>>', authError.response.statusText);
      return { errorStatus: authError.response.statusText };
    }
  }
);

export const logout = () => {
  window.localStorage.removeItem(TOKEN);
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(me.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(signup.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.error = action.payload?.error ?? null;
      })
      .addCase(login.fulfilled, (state, action: PayloadAction<any>) => {
        state.user = action.payload;
        state.error = action.payload?.error ?? null;
      });
  },
});

export default authSlice.reducer;
