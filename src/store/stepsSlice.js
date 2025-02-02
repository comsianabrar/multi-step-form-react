import { createSlice } from "@reduxjs/toolkit";

const stepsSlice = createSlice({
    name: "steps",
    initialState: {
        steps: ['About', 'Photo', 'Education Information', 'Work Experience', 'Tell us about yourself', 'Save and Publish'],
        currentStep: 0,
        visitedSteps: [],
    },
    reducers: {
        setCurrentStep: (state) => {
            state.currentStep += 1;
        },
        handleBackButton: (state) => {
            state.currentStep -= 1;
        },
        setVisitedSteps: (state, action) => {
            state.visitedSteps.push(action.payload);
        }
        // decrement: (state) => {
        //     state.steps -= 1;
        // },
    },
});


export const { setCurrentStep, setVisitedSteps, handleBackButton } = stepsSlice.actions;
export default stepsSlice.reducer;