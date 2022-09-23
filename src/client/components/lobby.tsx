import { Link } from 'react-router-dom'

export const Lobby = () => {

  const links = [];
  for (let i = 1; i <= 5; i++){
    links.push(
      <li>
        <Link to={`/room/${i}`}>{`Room ${i}`}</Link>
      </li>
    )
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