import { useState, useEffect, createContext } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom'
import io from 'socket.io-client'
import { Room } from './components/room'
import { Lobby } from './components/lobby';
import './App.css'

export const UserContext = createContext({
  userName: '',
  setUserName: (arg: any) => {}
});

export function App() {

  const [ userName, setUserName ] = useState('');
  const [ socket, setSocket ] = useState<any>(null);
  const value: any = { userName, setUserName };

  useEffect(() => {
    setSocket(io('http://localhost:3000/'));
  }, []);

  return (
    <HashRouter>
      <UserContext.Provider value={value}>
        <div className="App">
          <Routes>
            <Route path='/' element={<Lobby/>}/>
            <Route path='/room/:id' element={<Room socket={socket}/>}/>
          </Routes>
        </div>
      </UserContext.Provider>
    </HashRouter>
  )
}