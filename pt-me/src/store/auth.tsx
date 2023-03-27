import axios from 'axios';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

const TOKEN = 'token';

const initialState = {};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
  },
});

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = authSlice.actions;

export default authSlice.reducer;
