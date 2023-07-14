import { createAsyncThunk } from "@reduxjs/toolkit";
import { generatePhoneNumbers } from "./generateService";
import { getNumbers, setgenerateLoading } from "./generateReducer";
export const generateNumbers = createAsyncThunk(
    "generate/generateNumbers",
  async (_, thunkAPI) => {
    try {
      thunkAPI.dispatch(setgenerateLoading(true));
      const phoneNumbers = await generatePhoneNumbers();
      thunkAPI.dispatch(getNumbers(phoneNumbers));
      thunkAPI.dispatch(setgenerateLoading(false));
    } catch (error) {
      thunkAPI.dispatch(setgenerateLoading(false));
      console.log("Error generating numbers", error);
    }
  }
);
