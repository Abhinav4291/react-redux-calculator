import { describe, it, expect } from "vitest"
import calculatorReducer, {
  inputDigit,
  inputDecimal,
  inputOperation,
  performCalculation,
  clear,
  clearEntry,
  backspace,
} from "../calculatorSlice.js"

const initialState = {
  display: "0",
  previousValue: null,
  operation: null,
  waitingForOperand: false,
  error: null,
}

describe("calculatorSlice", () => {
  describe("inputDigit", () => {
    it("should input a digit when display is 0", () => {
      const action = inputDigit("5")
      const state = calculatorReducer(initialState, action)
      expect(state.display).toBe("5")
    })

    it("should append digit to existing display", () => {
      const state = { ...initialState, display: "12" }
      const action = inputDigit("3")
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("123")
    })

    it("should prevent leading zeros", () => {
      const action = inputDigit("0")
      const state = calculatorReducer(initialState, action)
      expect(state.display).toBe("0")

      const action2 = inputDigit("0")
      const state2 = calculatorReducer(state, action2)
      expect(state2.display).toBe("0")
    })

    it("should replace display when waiting for operand", () => {
      const state = { ...initialState, display: "10", waitingForOperand: true }
      const action = inputDigit("5")
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("5")
      expect(newState.waitingForOperand).toBe(false)
    })
  })

  describe("inputDecimal", () => {
    it("should add decimal point to display", () => {
      const state = { ...initialState, display: "5" }
      const action = inputDecimal()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("5.")
    })

    it("should not add decimal point if already present", () => {
      const state = { ...initialState, display: "5.2" }
      const action = inputDecimal()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("5.2")
    })

    it("should start with 0. when waiting for operand", () => {
      const state = { ...initialState, waitingForOperand: true }
      const action = inputDecimal()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("0.")
      expect(newState.waitingForOperand).toBe(false)
    })
  })

  describe("inputOperation", () => {
    it("should set operation and previous value", () => {
      const state = { ...initialState, display: "5" }
      const action = inputOperation("+")
      const newState = calculatorReducer(state, action)
      expect(newState.operation).toBe("+")
      expect(newState.previousValue).toBe(5)
      expect(newState.waitingForOperand).toBe(true)
    })

    it("should perform calculation when chaining operations", () => {
      const state = {
        ...initialState,
        display: "3",
        previousValue: 5,
        operation: "+",
      }
      const action = inputOperation("×")
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("8")
      expect(newState.previousValue).toBe(8)
      expect(newState.operation).toBe("×")
    })
  })

  describe("performCalculation", () => {
    it("should perform addition", () => {
      const state = {
        ...initialState,
        display: "3",
        previousValue: 5,
        operation: "+",
      }
      const action = performCalculation()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("8")
      expect(newState.previousValue).toBe(null)
      expect(newState.operation).toBe(null)
      expect(newState.waitingForOperand).toBe(true)
    })

    it("should perform subtraction", () => {
      const state = {
        ...initialState,
        display: "3",
        previousValue: 5,
        operation: "-",
      }
      const action = performCalculation()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("2")
    })

    it("should perform multiplication", () => {
      const state = {
        ...initialState,
        display: "3",
        previousValue: 5,
        operation: "×",
      }
      const action = performCalculation()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("15")
    })

    it("should perform division", () => {
      const state = {
        ...initialState,
        display: "2",
        previousValue: 10,
        operation: "÷",
      }
      const action = performCalculation()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("5")
    })

    it("should handle division by zero", () => {
      const state = {
        ...initialState,
        display: "0",
        previousValue: 10,
        operation: "÷",
      }
      const action = performCalculation()
      const newState = calculatorReducer(state, action)
      expect(newState.error).toBe("Cannot divide by zero")
      expect(newState.display).toBe("Error")
    })
  })

  describe("clear", () => {
    it("should reset calculator to initial state", () => {
      const state = {
        display: "123",
        previousValue: 456,
        operation: "+",
        waitingForOperand: true,
        error: "Some error",
      }
      const action = clear()
      const newState = calculatorReducer(state, action)
      expect(newState).toEqual(initialState)
    })
  })

  describe("clearEntry", () => {
    it("should clear display to 0", () => {
      const state = { ...initialState, display: "123" }
      const action = clearEntry()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("0")
    })

    it("should clear error state", () => {
      const state = { ...initialState, display: "Error", error: "Cannot divide by zero" }
      const action = clearEntry()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("0")
      expect(newState.error).toBe(null)
    })
  })

  describe("backspace", () => {
    it("should remove last character", () => {
      const state = { ...initialState, display: "123" }
      const action = backspace()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("12")
    })

    it("should set display to 0 when removing last character", () => {
      const state = { ...initialState, display: "5" }
      const action = backspace()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("0")
    })

    it("should not work when waiting for operand", () => {
      const state = { ...initialState, display: "123", waitingForOperand: true }
      const action = backspace()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("123")
    })

    it("should not work when there is an error", () => {
      const state = { ...initialState, display: "Error", error: "Cannot divide by zero" }
      const action = backspace()
      const newState = calculatorReducer(state, action)
      expect(newState.display).toBe("Error")
    })
  })
})
