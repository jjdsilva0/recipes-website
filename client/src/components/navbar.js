import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFeather,
  faFloppyDisk,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  const logout = () => {
    setCookies("access_token", "");
    window.localStorage.removeItem("userID");
    navigate("/auth");
  };

  const navLinkStyle = {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    color: "inherit",
    padding: "10px",
    marginRight: "10px",
    borderRadius: "5px",
    transition: "background-color 0.3s ease",
  };

  const logoutButtonStyle = {
    display: "flex",
    alignItems: "center",
    border: "none",
    backgroundColor: "transparent",
    color: "inherit",
    padding: "10px",
    marginRight: "10px",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  };

  const iconStyle = {
    marginRight: "5px",
  };

  return (
    <div className="navbar">
      <Link to="/" className="nav-link">
        <FontAwesomeIcon icon={faHouse} className="icon" />
        <span className="label">Home</span>
      </Link>
      <Link to="/create-recipe" className="nav-link">
        <FontAwesomeIcon icon={faFeather} className="icon" />
        <span className="label">Create Recipe</span>
      </Link>
      <Link to="/saved-recipes" className="nav-link">
        <FontAwesomeIcon icon={faFloppyDisk} className="icon" />
        <span className="label">Saved Recipes</span>
      </Link>
      {!cookies.access_token ? (
        <Link to="/auth" className="nav-link" style={navLinkStyle}>
          <FontAwesomeIcon
            icon={faRightToBracket}
            className="icon"
            style={iconStyle}
          />
          <span className="label">Login/Register</span>
        </Link>
      ) : (
        <button onClick={logout} style={logoutButtonStyle}>
          <FontAwesomeIcon
            icon={faRightToBracket}
            className="icon"
            style={iconStyle}
          />
          <span className="label">Logout</span>
        </button>
      )}
    </div>
  );
};
