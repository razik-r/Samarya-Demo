import './App.css'

import {Routes, Route} from 'react-router-dom'
import Checkout from './pages/Chekout'
import SamaryaHeroMock from './SamaryaHeroMock'
import SamaryaRooms from './SamaryaRooms'

function App() {
 

  return (
  <div className='app'>
       {/* <Navbar /> */}
    <Routes>
            <Route path="/" element={<SamaryaHeroMock/>} />
            <Route path="/rooms" element={<SamaryaRooms/>} />
            <Route path="/checkout" element={<Checkout />} />
    </Routes>
{/* <SamaryaHeroMock/>
<SamaryaRooms/> */}


  </div>
  )
}

export default App
