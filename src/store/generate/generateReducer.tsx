import { createSlice } from "@reduxjs/toolkit";

const generateSlice = createSlice({
  name: "generate",
  initialState: {
    generateLoading: false,
    phoneNumbers: [],
    checkLoading: false,
    registeredNumber: [],
    rejectNumber: [],
    uploadLoading: false,
    downloadLoading: false,
    loadingMessage: false,
    msg: "",
  },
  reducers: {
    //send Message
    sendMessage: (state, actions) => {
      state.msg = actions.payload;
    },
    loadingMessage: (state, actions) => {
      state.generateLoading = actions.payload;
    },
    // generate functions
    getNumbers: (state, actions) => {
      state.phoneNumbers = actions.payload;
    },
    setgenerateLoading: (state, actions) => {
      state.generateLoading = actions.payload;
    },

    // check function
    checkLoading: (state, actions) => {
      state.checkLoading = actions.payload;
    },
    getNumberRegistered: (state, actions) => {
      state.registeredNumber = actions.payload;
    },

    // upload file

    fileLoading: (state, actions) => {
      state.uploadLoading = actions.payload;
    },

    getFileResutlts: (state, actions) => {
      state.phoneNumbers = actions.payload;
    },

    //download file

    downloadLoading: (state, actions) => {
      state.downloadLoading = actions.payload;
    },
  },
});

export const {
  getNumbers,
  setgenerateLoading,
  checkLoading,
  getNumberRegistered,
  fileLoading,
  getFileResutlts,
  downloadLoading,
  loadingMessage,
} = generateSlice.actions;

export default generateSlice.reducer;
