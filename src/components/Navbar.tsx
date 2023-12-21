import { Link } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import classes from "./Navbar.module.css";

const Navbar = () => {
  const { isLoggedIn, username, logout } = useAuth();

  return (
    <nav className={classes.nav}>
      <div className={classes.logo}>
        <Link to="/">
          <img src="/img/logo.svg" alt="LearnHub-logo" />
          <p>LearnHub</p>
        </Link>
      </div>

      <div className={classes.menu}>
        {!isLoggedIn ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <p>{`Welcome! ${username}`}</p>
            <a onClick={logout}>Logout</a>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
