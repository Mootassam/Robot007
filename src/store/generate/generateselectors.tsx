import { createSelector } from "reselect";

const selectGenerateState = (state:any) => state.generate;


export const selectphoneNumbers = createSelector(
    selectGenerateState,
    (generate) => generate.phoneNumbers
)


export const selectGenerateLoading = createSelector(
    selectGenerateState, 
    (generate) => generate.generateLoading
)