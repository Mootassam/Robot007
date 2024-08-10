import { createSelector } from "reselect";

const selectGenerateState = (state: any) => state.generate;

export const selectphoneNumbers = createSelector(
  selectGenerateState,
  (generate) => generate.phoneNumbers
);

export const selectGenerateLoading = createSelector(
  selectGenerateState,
  (generate) => generate.generateLoading
);

// check functions

export const checkLoading = createSelector(
  selectGenerateState,
  (generate) => generate.checkLoading
);

// check the number registered
export const numberRegistered = createSelector(
  selectGenerateState,
  (generate) => generate.checkLoading
);
export const lengthRegistered = createSelector(
  selectGenerateState,
  (generate) => generate.rejectNumber.length
);

// check the number Rejects
export const numberRejects = createSelector(
  selectGenerateState,
  (generate) => generate.rejectNumber
);
export const lengthRejects = createSelector(
  selectGenerateState,
  (generate) => generate.rejectNumber.length
);

// Upload the file csv

export const fileLoading = createSelector(
  selectGenerateState,
  (generate) => generate.uploadLoading
);

export const fileResults = createSelector(
  selectGenerateState,
  (generate) => generate.getFileResutlts
);

// Download the file

export const downloadLoading = createSelector(
  selectGenerateState,
  (generate) => generate.downloadLoading
);
