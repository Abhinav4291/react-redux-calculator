"use client"

import React from "react"
import { useDispatch } from "react-redux"
import {
  inputDigit,
  inputDecimal,
  inputOperation,
  performCalculation,
  clear,
} from "../features/calculator/calculatorSlice.js"
import Button from "./Button.jsx"

const Keypad = React.memo(() => {
  const dispatch = useDispatch()

  const handleDigitClick = (digit) => {
    dispatch(inputDigit(digit))
  }

  const handleOperationClick = (operation) => {
    dispatch(inputOperation(operation))
  }

  const handleDecimalClick = () => {
    dispatch(inputDecimal())
  }

  const handleEqualsClick = () => {
    dispatch(performCalculation())
  }

  const handleClearClick = () => {
    dispatch(clear())
  }

  const handleToggleSign = () => {
    // Toggle sign functionality - multiply by -1
    dispatch(inputOperation("×"))
    dispatch(inputDigit("-1"))
    dispatch(performCalculation())
  }

  const handlePercentage = () => {
    dispatch(inputOperation("÷"))
    dispatch(inputDigit("100"))
    dispatch(performCalculation())
  }

  return (
    <div className="keypad">
      {/* Row 1 */}
      <Button onClick={handleClearClick} className="function" ariaLabel="All Clear">
        AC
      </Button>
      <Button onClick={handleToggleSign} className="function" ariaLabel="Plus Minus">
        +/-
      </Button>
      <Button onClick={handlePercentage} className="function" ariaLabel="Percentage">
        %
      </Button>
      <Button onClick={() => handleOperationClick("÷")} className="operator" ariaLabel="Divide">
        ÷
      </Button>

      {/* Row 2 */}
      <Button onClick={() => handleDigitClick("7")} className="digit">
        7
      </Button>
      <Button onClick={() => handleDigitClick("8")} className="digit">
        8
      </Button>
      <Button onClick={() => handleDigitClick("9")} className="digit">
        9
      </Button>
      <Button onClick={() => handleOperationClick("×")} className="operator" ariaLabel="Multiply">
        ×
      </Button>

      {/* Row 3 */}
      <Button onClick={() => handleDigitClick("4")} className="digit">
        4
      </Button>
      <Button onClick={() => handleDigitClick("5")} className="digit">
        5
      </Button>
      <Button onClick={() => handleDigitClick("6")} className="digit">
        6
      </Button>
      <Button onClick={() => handleOperationClick("-")} className="operator" ariaLabel="Subtract">
        -
      </Button>

      {/* Row 4 */}
      <Button onClick={() => handleDigitClick("1")} className="digit">
        1
      </Button>
      <Button onClick={() => handleDigitClick("2")} className="digit">
        2
      </Button>
      <Button onClick={() => handleDigitClick("3")} className="digit">
        3
      </Button>
      <Button onClick={() => handleOperationClick("+")} className="operator" ariaLabel="Add">
        +
      </Button>

      {/* Row 5 */}
      <Button onClick={() => handleDigitClick("0")} className="digit zero">
        0
      </Button>
      <Button onClick={handleDecimalClick} className="digit" ariaLabel="Decimal point">
        .
      </Button>
      <Button onClick={handleEqualsClick} className="operator" ariaLabel="Equals">
        =
      </Button>
    </div>
  )
})

Keypad.displayName = "Keypad"

export default Keypad
