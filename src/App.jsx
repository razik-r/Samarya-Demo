import './App.css'

import {Routes, Route} from 'react-router-dom'
import Checkout from './pages/Chekout'
import SamaryaHeroMock from './SamaryaHeroMock'
import SamaryaRooms from './SamaryaRooms'
import SamaryaHeader from './components/SamaryaHeader'
import { content } from "./SamaryaHeroMock";

import ScrollToTop from './ScrollToTop'

function App() {
 

  return (
  <div className='app'>
       {/* <Navbar /> */}


          <SamaryaHeader
                       logo={content.logo}
                       navLinks={content.navLinks}
                       bookingUrl={content.whatsapp}
                       primaryCta={content.ctaPrimary}
                     />
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
