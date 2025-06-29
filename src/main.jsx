import React from "react"
import ReactDOM from "react-dom/client"
import { Provider } from "react-redux"
import { store } from "./app/store.js"
import App from "./App.jsx"
import "./index.css"

// Make sure the DOM is fully loaded before rendering
document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>,
  )
})
