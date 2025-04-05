import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import Navbar from './components/Navbar';
import CreateAccount from './pages/CreateAccount';
import './App.css'
import { useEffect } from 'react';

export function wsTest(){
	const socket = new WebSocket("ws://localhost:8080/api/ws");

	socket.onopen = () => {
	  console.log("Connected");
	  socket.send("Hello server!");
	};

	socket.onmessage = (event) => {
	  console.log("Received:", event.data);
	};

	socket.onclose = () => {
	  console.log("Disconnected");
	};
}

function App() {
  useEffect(() => {
    wsTest();
  }, []);
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
