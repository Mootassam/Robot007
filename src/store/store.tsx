import {
  ConfigureStoreOptions,
  configureStore,
  createSlice,
} from "@reduxjs/toolkit";
import generateReducer from "./generate/generateReducer";



const store = configureStore({
  reducer: {
    generate: generateReducer,
  },
});



export default store;
