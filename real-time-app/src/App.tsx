import './App.css'
import './styles/Navbar.css'
import './styles/Toolbar.css'
import './styles/outputBox.css'
import './styles/textbox.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import Navbar from './components/Navbar';
import CreateAccount from './pages/CreateAccount';


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
