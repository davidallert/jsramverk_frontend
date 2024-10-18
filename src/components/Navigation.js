import { Outlet, Link } from "react-router-dom";
import '../style/nav.css';

const Navigation = () => {
  return (
    <>
      <nav className="nav">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/documents">Documents</Link>
          </li>
          <li>
            <Link to="/document/66e6fce08939d00d5d5d578d">Example doc</Link>
          </li>
          <li>
            <Link to="/create">Create new</Link>
          </li>
          <li>
            <Link to="/user">Create new user</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Navigation;