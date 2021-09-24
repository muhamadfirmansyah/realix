import { Header } from "antd/lib/layout/layout";
import Cookies from "js-cookie";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <Header style={{ position: "sticky" }}>
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
                { Cookies.get("token") ? (
                    <>
                        <li>
                            <NavLink to="/login" exact>Admin</NavLink>
                        </li>
                        <li>
                            <NavLink to="/register" exact className="nav-button">Logout</NavLink>
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
