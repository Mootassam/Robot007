import { createSlice } from "@reduxjs/toolkit";

const generateSlice = createSlice({
  name: "generate",
  initialState: {
    generateLoading: false,
    phoneNumbers: [],
  },
  reducers: {
    getNumbers: (state, actions) => {
      state.phoneNumbers = actions.payload;
    },
    setgenerateLoading: (state, actions) => {
      state.generateLoading = actions.payload;
    },
  },
});

export const { getNumbers, setgenerateLoading } = generateSlice.actions;

export default generateSlice.reducer;
