import { Outlet } from 'react-router-dom'
import Navbar from './landing_page/Navbar'
import Footer from './landing_page/Footer'

function App() {
  return (
    <div>
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
