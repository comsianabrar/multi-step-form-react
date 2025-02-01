import { configureStore } from "@reduxjs/toolkit";

import stepsSliceReducer from "./stepsSlice";

export const store = configureStore({
    reducer: {
        steps: stepsSliceReducer,
    },  
});
