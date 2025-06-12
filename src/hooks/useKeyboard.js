"use client"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import {
  inputDigit,
  inputDecimal,
  inputOperation,
  performCalculation,
  clear,
  clearEntry,
  backspace,
} from "../features/calculator/calculatorSlice.js"

const useKeyboard = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const handleKeyDown = (event) => {
      const { key } = event

      // Prevent default behavior for calculator keys
      if (/[0-9+\-*/=.c]|Enter|Backspace|Delete|Escape/i.test(key)) {
        event.preventDefault()
      }

      // Handle digit keys
      if (/[0-9]/.test(key)) {
        dispatch(inputDigit(key))
        return
      }

      // Handle operation keys
      switch (key) {
        case "+":
          dispatch(inputOperation("+"))
          break
        case "-":
          dispatch(inputOperation("-"))
          break
        case "*":
          dispatch(inputOperation("×"))
          break
        case "/":
          dispatch(inputOperation("÷"))
          break
        case "=":
        case "Enter":
          dispatch(performCalculation())
          break
        case ".":
          dispatch(inputDecimal())
          break
        case "Backspace":
          dispatch(backspace())
          break
        case "Delete":
          dispatch(clearEntry())
          break
        case "Escape":
        case "c":
        case "C":
          dispatch(clear())
          break
        default:
          break
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [dispatch])
}

export default useKeyboard
