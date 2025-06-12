import { describe, it, expect } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import { configureStore } from "@reduxjs/toolkit"
import calculatorReducer from "../../features/calculator/calculatorSlice.js"
import App from "../../App.jsx"

const createTestStore = () => {
  return configureStore({
    reducer: {
      calculator: calculatorReducer,
    },
  })
}

const renderWithProvider = (component) => {
  const store = createTestStore()
  return render(<Provider store={store}>{component}</Provider>)
}

describe("Calculator Integration", () => {
  it("should render calculator with initial display of 0", () => {
    renderWithProvider(<App />)
    expect(screen.getByDisplayValue("0")).toBeInTheDocument()
  })

  it("should perform basic addition: 5 + 2 = 7", async () => {
    const user = userEvent.setup()
    renderWithProvider(<App />)

    await user.click(screen.getByRole("button", { name: "5" }))
    await user.click(screen.getByRole("button", { name: "Add" }))
    await user.click(screen.getByRole("button", { name: "2" }))
    await user.click(screen.getByRole("button", { name: "Equals" }))

    expect(screen.getByDisplayValue("7")).toBeInTheDocument()
  })

  it("should perform sequential operations: 5 × 2 + 3 = 13", async () => {
    const user = userEvent.setup()
    renderWithProvider(<App />)

    await user.click(screen.getByRole("button", { name: "5" }))
    await user.click(screen.getByRole("button", { name: "Multiply" }))
    await user.click(screen.getByRole("button", { name: "2" }))
    await user.click(screen.getByRole("button", { name: "Add" }))
    await user.click(screen.getByRole("button", { name: "3" }))
    await user.click(screen.getByRole("button", { name: "Equals" }))

    expect(screen.getByDisplayValue("13")).toBeInTheDocument()
  })

  it("should handle division by zero", async () => {
    const user = userEvent.setup()
    renderWithProvider(<App />)

    await user.click(screen.getByRole("button", { name: "5" }))
    await user.click(screen.getByRole("button", { name: "Divide" }))
    await user.click(screen.getByRole("button", { name: "0" }))
    await user.click(screen.getByRole("button", { name: "Equals" }))

    expect(screen.getByDisplayValue("Error")).toBeInTheDocument()
    expect(screen.getByRole("alert")).toHaveTextContent("Cannot divide by zero")
  })

  it("should handle decimal numbers", async () => {
    const user = userEvent.setup()
    renderWithProvider(<App />)

    await user.click(screen.getByRole("button", { name: "1" }))
    await user.click(screen.getByRole("button", { name: "Decimal point" }))
    await user.click(screen.getByRole("button", { name: "5" }))
    await user.click(screen.getByRole("button", { name: "Add" }))
    await user.click(screen.getByRole("button", { name: "2" }))
    await user.click(screen.getByRole("button", { name: "Decimal point" }))
    await user.click(screen.getByRole("button", { name: "5" }))
    await user.click(screen.getByRole("button", { name: "Equals" }))

    expect(screen.getByDisplayValue("4")).toBeInTheDocument()
  })

  it("should clear calculator with C button", async () => {
    const user = userEvent.setup()
    renderWithProvider(<App />)

    await user.click(screen.getByRole("button", { name: "1" }))
    await user.click(screen.getByRole("button", { name: "2" }))
    await user.click(screen.getByRole("button", { name: "3" }))
    await user.click(screen.getByRole("button", { name: "Clear all" }))

    expect(screen.getByDisplayValue("0")).toBeInTheDocument()
  })

  it("should handle backspace", async () => {
    const user = userEvent.setup()
    renderWithProvider(<App />)

    await user.click(screen.getByRole("button", { name: "1" }))
    await user.click(screen.getByRole("button", { name: "2" }))
    await user.click(screen.getByRole("button", { name: "3" }))
    await user.click(screen.getByRole("button", { name: "Backspace" }))

    expect(screen.getByDisplayValue("12")).toBeInTheDocument()
  })

  it("should support keyboard input", async () => {
    const user = userEvent.setup()
    renderWithProvider(<App />)

    await user.keyboard("5+2=")

    expect(screen.getByDisplayValue("7")).toBeInTheDocument()
  })

  it("should prevent leading zeros", async () => {
    const user = userEvent.setup()
    renderWithProvider(<App />)

    await user.click(screen.getByRole("button", { name: "0" }))
    await user.click(screen.getByRole("button", { name: "0" }))
    await user.click(screen.getByRole("button", { name: "5" }))

    expect(screen.getByDisplayValue("5")).toBeInTheDocument()
  })
})
