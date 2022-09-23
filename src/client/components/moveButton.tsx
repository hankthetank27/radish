import { PropsWithChildren } from 'react';
import { BallProps } from '../../@types';

export const MoveButton: React.FC<PropsWithChildren<BallProps>> = ({ moveBall, ballValue, text }: BallProps) => {
  return (
    <div className='moveButtonContainer'>
      <button onClick={() => { moveBall(ballValue) }}>{text}</button>
    </div>
  )
}