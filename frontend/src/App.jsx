import { useState } from 'react'
import Navbar from './landing_page/Navbar'
import Footer from './landing_page/Footer'
import About from './landing_page/about/About'

function App() {

  return (
    <>
      <div>
        <Navbar />
        <Footer />
        <About />
      </div>
    </>
  )
}

export default App
