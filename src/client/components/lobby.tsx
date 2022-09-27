import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../App'


export const Lobby = () => {

  const [ userNameInput, setUserNameInput ] = useState('');
  const [ links, setLinks ] = useState<Array<JSX.Element>>();
  const { userName, setUserName } = useContext(UserContext);

  useEffect(() => {
    if (!userName) return;
    const linksArr = [];
      for (let i = 1; i <= 5; i++){
        linksArr.push(
          <li>
            <Link to={`/room/${i}`}>{`Room ${i}`}</Link>
          </li>
        )
      }
      setLinks(linksArr);
  }, [userName]);
  

  return (
    <div className="lobby">
      <div className="lobbyBorder">
        <ul>
           {links}
        </ul>
        <div>Please Enter a Username</div>
        <form>

          <input type="text" value={userNameInput} onChange={(e) => {
            e.preventDefault();
            setUserNameInput(e.target.value);
          }}/>

          <button onClick={(e) => {
            e.preventDefault();
            setUserName(userNameInput);
            setUserNameInput('');
          }}>Submit</button>

        </form>
      </div>
    </div>
  );
}