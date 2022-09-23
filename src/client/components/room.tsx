import { useParams, useNavigate } from "react-router-dom";
import { useState } from 'react';
import { MoveButton } from './moveButton';
import { ChatBox } from './chatBox';
import p5Types from 'p5';
import Sketch from "react-p5";

interface Props {
  socket: any
}

export const Room = ({ socket }: Props) => {

  const [x, setX] = useState(350);
  const [y, setY] = useState(350);
  const { id } = useParams();
  const navigate = useNavigate();

  //navigate back if room out of range
  if (!id || parseInt(id) < 1 || parseInt(id) > 5){
    navigate('/');
  }

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    p5.createCanvas(700, 700).parent(canvasParentRef);
  };

  const draw = (p5: p5Types) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
  };
  
  return (
    <div className="room">
      <h3 className="roomNameHeader">{`Room ${id}`}</h3>
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
        <ChatBox socket={socket} id={id} />
      </div>
    </div>
  )
}