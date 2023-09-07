"use client";

import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CLIENT, BASE_URL } from "@/components/api";
import { create } from "domain";
import { RootState } from "@/Redux/store";

export interface PatientData {
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

interface ExerciseData {
  id: number;
  map: any;
  name: String;
  injuryId: Number;
  videoLink: string;
  Patients: PatientData[];
  tips: String;
  description: String;
  musclesWorked: String;
}

type PatientState = {
  data: PatientData | null;
  exercises: ExerciseData | null;
  loading: boolean;
  error: string | null;
};

const initialState: PatientState = {
  data: null,
  exercises: null,
  loading: false,
  error: null,
};

export const fetchAllPatients = createAsyncThunk<PatientData, number>(
  "patients/fetchAllPatients",
  async (id: number, thunkAPI) => {
    try {
      const res = await CLIENT.get(`${BASE_URL}/api/patients/${id}`);
      return res.data;
    } catch (error) {
      console.log("Redux error: ", error);
    }
  }
);

export const fetchPatient = createAsyncThunk<PatientData, number>(
  "patients/fetchPatient",
  async (id: number, thunkAPI) => {
    try {
      const res = await CLIENT.get(`${BASE_URL}/api/patients/patient/${id}`);
      return res.data;
    } catch (error) {
      console.log("Redux error: ", error);
    }
  }
);

export const fetchPatientsExercises = createAsyncThunk<ExerciseData, number>(
  "patients/fetchPatientsExercises",
  async (id: number) => {
    try {
      const res = await CLIENT.get(`${BASE_URL}/api/exercises/patient/${id}`);
      return res.data;
    } catch (error) {
      console.log("Redux error: ", error);
    }
  }
);

export const patientSlice = createSlice({
  name: "patients",
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
      })
      .addCase(fetchPatient.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPatient.fulfilled,
        (state, action: PayloadAction<PatientData>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchPatient.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchPatientsExercises.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPatientsExercises.fulfilled, (state, action) => {
        state.loading = false;
        state.exercises = action.payload;
      })
      .addCase(fetchPatientsExercises.rejected, (state, action) => {
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
