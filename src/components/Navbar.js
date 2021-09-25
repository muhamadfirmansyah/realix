import { Header } from "antd/lib/layout/layout";
import Cookies from "js-cookie";
import { Link, NavLink, useHistory } from "react-router-dom";

const Navbar = () => {

    const history = useHistory()

    const setLogout = () => {
        Cookies.remove("user_token")

        history.push('/')
    }

  return (
    <Header>
        <div>
            <h1>
                <Link to="/">Realix</Link>
            </h1>
        </div>
        <nav>
            <ul>
                <li>
                    <NavLink to="/" exact>Explore</NavLink>
                </li>
                <li>
                    <NavLink to="/movies">Movies</NavLink>
                </li>
                <li>
                    <NavLink to="/games">Games</NavLink>
                </li>
                { Cookies.get("user_token") ? (
                    <>
                        <li>
                            <NavLink to="/admin/movies">Admin</NavLink>
                        </li>
                        <li>
                            <button onClick={() => setLogout()} className="nav-button">Logout</button>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <NavLink to="/login" exact>Login</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" exact className="nav-button">Create New Account</NavLink>
                        </li>
                    </>
                ) }
            </ul>
        </nav>
    </Header>
  );
};

export default Navbar;
