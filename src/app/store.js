import { configureStore } from "@reduxjs/toolkit"
import calculatorReducer from "../features/calculator/calculatorSlice.js"

// Create the store
export const store = configureStore({
  reducer: {
    calculator: calculatorReducer,
  },
})
