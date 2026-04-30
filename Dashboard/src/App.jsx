import React from "react"
import { RouterProvider } from "react-router-dom"
import './index.jsx'
import router from './index.jsx'
import { Dashboard } from "@mui/icons-material"

function App() {

  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
