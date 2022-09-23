import { Room } from './room';
import { Link } from 'react-router-dom'

export const Lobby = () => {

  const links = [];
  for (let i = 0; i < 10; i++){
    links.push(<li><Link to={`/room/${i}`}>{`Room ${i}`}</Link></li>)
  }

  return (
    <div className="lobby">
      <div className="lobbyBorder">
        <ul>
          {links}
        </ul>
      </div>
    </div>
  )
}