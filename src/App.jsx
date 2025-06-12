"use client"

import { useEffect, useState } from "react"
import { Provider } from "react-redux"
import "./App.css"
import { store } from "./app/store.js"
import Display from "./components/Display.jsx"
import Keypad from "./components/Keypad.jsx"
import useKeyboard from "./hooks/useKeyboard.js"

function CalculatorContent() {
  useKeyboard()

  return (
    <>
      <h1 className="sr-only">Abhinav Calculator</h1>
      <Display />
      <Keypad />
    </>
  )
}

function App() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    document.title = "Abhinav Calc"
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="app">
        <main className="calculator" role="main">
          <div className="loading">Loading Abhinav Calc...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="app">
      <main className="calculator" role="main">
        <Provider store={store}>
          <CalculatorContent />
        </Provider>
      </main>
    </div>
  )
}

export default App
