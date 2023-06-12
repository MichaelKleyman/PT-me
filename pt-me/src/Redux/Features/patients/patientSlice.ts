'use client';

import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import Axios from 'axios';
import { CLIENT, BASE_URL } from '@/components/api';
import { create } from 'domain';
import { RootState } from '@/Redux/store';

interface PatientData {
  id: number;
  title: string;
  address: string;
  phoneNumber: string;
  email: string;
  reasonForVisit: string;
  age: string;
  injuryId: number;
  insurance: string;
  start?: Date | undefined;
  end?: Date | undefined;
}

type PatientState = {
  data: PatientData | null;
  loading: boolean;
  error: string | null;
};

const initialState: PatientState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchAllPatients = createAsyncThunk<PatientData, number>(
  'patients/fetchAllPatients',
  async (id: number, thunkAPI) => {
    try {
      const res = await CLIENT.get(`${BASE_URL}/api/patients/${id}`);
      return res.data;
    } catch (error) {
      console.log('Redux error: ', error);
    }
  }
);

export const patientSlice = createSlice({
  name: 'patients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllPatients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAllPatients.fulfilled,
        (state, action: PayloadAction<PatientData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchAllPatients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default patientSlice.reducer;

//selector to access the data from the state
export const selectData = (state: RootState) => state.patient.data;
export const selectLoading = (state: RootState) => state.patient.loading;
export const selectError = (state: RootState) => state.patient.error;
