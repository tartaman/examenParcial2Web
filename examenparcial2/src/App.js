import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './Pages/Home'
import DetallePlatillo from './Pages/DetallePlatillo';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/platillo/:id" element={<DetallePlatillo />} />
    </Routes>
  )
}

export default App;
