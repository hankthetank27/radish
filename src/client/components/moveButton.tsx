import { PropsWithChildren } from 'react';

export interface Props {
  moveBall: React.Dispatch<React.SetStateAction<number>>;
  ballValue: number;
  text: string;
};

export const MoveButton: React.FC<PropsWithChildren<Props>> = ({ moveBall, ballValue, text }: Props) => {
  return (
    <div className='moveButtonContainer'>
      <button onClick={() => { moveBall(ballValue) }}>{text}</button>
    </div>
  )
}