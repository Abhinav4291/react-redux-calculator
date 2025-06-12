import React from "react"
import { useSelector } from "react-redux"
import { selectDisplay, selectError } from "../features/calculator/calculatorSlice.js"

const Display = React.memo(() => {
  const display = useSelector(selectDisplay)
  const error = useSelector(selectError)

  return (
    <div className="display-container">
      <output className={`display ${error ? "error" : ""}`} aria-live="polite" aria-label="Calculator display">
        {display}
      </output>
      {error && (
        <div className="error-message" role="alert">
          {error}
        </div>
      )}
    </div>
  )
})

Display.displayName = "Display"

export default Display
