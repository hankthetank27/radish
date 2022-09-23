import { useState, useEffect } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'
import io from 'socket.io-client'
import { Room } from './components/room'
import { Lobby } from './components/lobby';
import './App.css'

function App() {

  const [ socket, setSocket ] = useState<any>(null);

  useEffect(() => {
    setSocket(io('http://localhost:3000/'));
  }, []);

  return (
    <HashRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Lobby/>}/>
          <Route path='/room/:id' element={<Room socket={socket}/>}/>
        </Routes>
      </div>
    </HashRouter>
  )
}

export default App;