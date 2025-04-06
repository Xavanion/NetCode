import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import Navbar from './components/Navbar';
import CreateAccount from './pages/CreateAccount';
import './App.css'

function App() {
  return (
      <BrowserRouter>
        <div className='app-content'>
          <Navbar />
          <div className='content-container'>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/account" element={<Account />}/>
                <Route path="/create-account" element={<CreateAccount />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
  )
}

export default App
