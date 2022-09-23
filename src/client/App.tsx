import { useState } from 'react';
import { MoveButton } from './components/moveButton';
import { ChatBox } from './components/chatBox';
import p5Types from 'p5';
import Sketch from "react-p5";
import './App.css'

function App() {

  const [x, setX] = useState(350);
  const [y, setY] = useState(350);

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(700, 700).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
  };

  return (
    <div className="App">
      <div className="buttonPairContainer">
        <MoveButton moveBall={setX} ballValue={x + 20} text={'X++'} />
        <MoveButton moveBall={setX} ballValue={x - 20} text={'X--'} />
      </div>
      <div className='xValue'>{x}</div>
      <div className="buttonPairContainer">
        <MoveButton moveBall={setY} ballValue={y + 20} text={'Y++'} />
        <MoveButton moveBall={setY} ballValue={y - 20} text={'Y--'} />
      </div>
      <div className='yValue'>{y}</div>
      <div className='mainContainer'>
        <Sketch setup={setup} draw={draw} />
        <ChatBox />
      </div>

    </div>
  )
}

export default App;