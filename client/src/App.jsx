import './App.css'
import Cookies from 'universal-cookie'

function App() {
  const cookies = new Cookies(null , {path: '/'});
  if(cookies.get('token') === undefined){
    window.location.href = "/login";
  }
  return (
    <>
      
    </>
  )
}

export default App
