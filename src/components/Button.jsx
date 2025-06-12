"use client"

import React from "react"

const Button = React.memo(({ onClick, className = "", children, ariaLabel, disabled = false, ...props }) => {
  return (
    <button
      className={`calc-button ${className}`}
      onClick={onClick}
      aria-label={ariaLabel || children}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button
