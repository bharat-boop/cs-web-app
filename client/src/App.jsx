
import './App.css'
import {Routes,Route} from 'react-router-dom'
import Login from './components/login/Login';
import Register from './components/register/Register';

function App() {
  return (
    <div>
      <Routes>
        <Route  path="/register" element={<Register/>}/>
        <Route  path="/login" element={<Login/>}/>
      </Routes>
    </div>
  )
}

export default App
