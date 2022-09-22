import { PropsWithChildren } from 'react';
import { AppProps } from '../../@types';

export const MoveButton: React.FC<PropsWithChildren<AppProps>> = ({ moveBall, ballValue, text }: AppProps) => {
    return (
        <div>
            <button onClick={ ()=> {moveBall(ballValue)}}>{text}</button>
        </div>
    )
}