// slices/studentSlice.js
import { createSlice } from "@reduxjs/toolkit";

const studentSlice = createSlice({
  name: "student",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchStudentsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchStudentsSuccess(state, action) {
      state.loading = false;
      state.data = action.payload;
    },
    fetchStudentsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addStudent(state, action) {
      state.data.push(action.payload);
    },
    updateStudent(state, action) {
      const updatedStudent = action.payload;
      const index = state.data.findIndex(
        (student) => student.id === updatedStudent.id
      );
      if (index !== -1) {
        state.data[index] = updatedStudent;
      }
    },
    deleteStudent(state, action) {
      state.data = state.data.filter(
        (student) => student.id !== action.payload
      );
    },
  },
});

export const {
  fetchStudentsStart,
  fetchStudentsSuccess,
  fetchStudentsFailure,
  addStudent,
  updateStudent,
  deleteStudent,
} = studentSlice.actions;

export default studentSlice.reducer;
