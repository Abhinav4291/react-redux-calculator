import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  display: "0",
  previousValue: null,
  operation: null,
  waitingForOperand: false,
  error: null,
}

const calculatorSlice = createSlice({
  name: "calculator",
  initialState,
  reducers: {
    inputDigit: (state, action) => {
      const digit = action.payload

      if (state.error) {
        state.display = digit
        state.error = null
        state.previousValue = null
        state.operation = null
        state.waitingForOperand = false
        return
      }

      if (state.waitingForOperand) {
        state.display = digit
        state.waitingForOperand = false
      } else {
        // Prevent leading zeros
        if (state.display === "0" && digit !== ".") {
          state.display = digit
        } else {
          state.display = state.display + digit
        }
      }
    },

    inputDecimal: (state) => {
      if (state.error) {
        state.display = "0."
        state.error = null
        state.previousValue = null
        state.operation = null
        state.waitingForOperand = false
        return
      }

      if (state.waitingForOperand) {
        state.display = "0."
        state.waitingForOperand = false
      } else if (state.display.indexOf(".") === -1) {
        state.display = state.display + "."
      }
    },

    inputOperation: (state, action) => {
      const nextOperation = action.payload
      const inputValue = Number.parseFloat(state.display)

      if (state.error) {
        state.error = null
      }

      if (state.previousValue === null) {
        state.previousValue = inputValue
      } else if (state.operation) {
        const currentValue = state.previousValue || 0
        const newValue = calculate(currentValue, inputValue, state.operation)

        if (newValue === null) {
          state.error = "Cannot divide by zero"
          state.display = "Error"
          state.previousValue = null
          state.operation = null
          state.waitingForOperand = true
          return
        }

        // Handle floating point precision
        const formattedValue = formatResult(newValue)
        state.display = formattedValue
        state.previousValue = Number.parseFloat(formattedValue)
      }

      state.waitingForOperand = true
      state.operation = nextOperation
    },

    performCalculation: (state) => {
      const inputValue = Number.parseFloat(state.display)

      if (state.error) {
        return
      }

      if (state.previousValue !== null && state.operation) {
        const currentValue = state.previousValue
        const newValue = calculate(currentValue, inputValue, state.operation)

        if (newValue === null) {
          state.error = "Cannot divide by zero"
          state.display = "Error"
          state.previousValue = null
          state.operation = null
          state.waitingForOperand = true
          return
        }

        const formattedValue = formatResult(newValue)
        state.display = formattedValue
        state.previousValue = null
        state.operation = null
        state.waitingForOperand = true
      }
    },

    clear: (state) => {
      state.display = "0"
      state.previousValue = null
      state.operation = null
      state.waitingForOperand = false
      state.error = null
    },

    clearEntry: (state) => {
      if (state.error) {
        state.display = "0"
        state.error = null
        state.previousValue = null
        state.operation = null
        state.waitingForOperand = false
      } else {
        state.display = "0"
      }
    },

    backspace: (state) => {
      if (state.error || state.waitingForOperand) {
        return
      }

      if (state.display.length > 1) {
        state.display = state.display.slice(0, -1)
      } else {
        state.display = "0"
      }
    },
  },
})

// Helper function to perform calculations
function calculate(firstValue, secondValue, operation) {
  switch (operation) {
    case "+":
      return firstValue + secondValue
    case "-":
      return firstValue - secondValue
    case "×":
      return firstValue * secondValue
    case "÷":
      if (secondValue === 0) {
        return null // Division by zero
      }
      return firstValue / secondValue
    default:
      return secondValue
  }
}

// Helper function to format results and handle floating point precision
function formatResult(value) {
  // Handle very large or very small numbers
  if (Math.abs(value) > 1e15 || (Math.abs(value) < 1e-6 && value !== 0)) {
    return value.toExponential(6)
  }

  // Round to avoid floating point precision issues
  const rounded = Math.round(value * 1e10) / 1e10

  // Convert to string and remove unnecessary trailing zeros
  let result = rounded.toString()

  // Limit display length
  if (result.length > 12) {
    if (result.includes(".")) {
      const parts = result.split(".")
      const integerPart = parts[0]
      if (integerPart.length > 12) {
        return Number.parseFloat(result).toExponential(6)
      }
      const availableDecimals = 12 - integerPart.length - 1
      result = rounded.toFixed(Math.max(0, availableDecimals))
      // Remove trailing zeros
      result = result.replace(/\.?0+$/, "")
    } else {
      return Number.parseFloat(result).toExponential(6)
    }
  }

  return result
}

export const { inputDigit, inputDecimal, inputOperation, performCalculation, clear, clearEntry, backspace } =
  calculatorSlice.actions

export default calculatorSlice.reducer

// Selectors
export const selectDisplay = (state) => state.calculator.display
export const selectError = (state) => state.calculator.error
export const selectOperation = (state) => state.calculator.operation
export const selectWaitingForOperand = (state) => state.calculator.waitingForOperand
