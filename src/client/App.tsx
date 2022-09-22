import { useState } from 'react';
import p5Types from 'p5';
import Sketch from "react-p5";
import './App.css'
import { MoveButton } from './components/moveButton';

function App() {

    const [ x, setX ] = useState(350);
    const [ y, setY ] = useState(350);

    const setup = (p5: p5Types, canvasParentRef: Element) => {
        p5.createCanvas(700, 700).parent(canvasParentRef);
    }

    const draw = (p5: p5Types) => {
		p5.background(0);
		p5.ellipse(x, y, 70, 70);
	};

    return (
        <div className="App">
            <MoveButton moveBall={setX} ballValue={x + 20} text={'Increase X'}/>
            <span><MoveButton moveBall={setX} ballValue={x - 20} text={'Decrease X'}/></span>
            <div>{ x }</div>
            <MoveButton moveBall={setY} ballValue={y + 20} text={'Increase X'}/>
            <span><MoveButton moveBall={setY} ballValue={y - 20} text={'Decrease X'}/></span>
            <div>{ y }</div>
            <Sketch setup={setup} draw={draw}/>
        </div>
    )
}

export default App;