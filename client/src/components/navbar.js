import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHouse,
  faFeather,
  faFloppyDisk,
  faRightToBracket,
} from "@fortawesome/free-solid-svg-icons";

export const Navbar = () => {
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
      <Link to="/auth" className="nav-link">
        <FontAwesomeIcon icon={faRightToBracket} className="icon" />
        <span className="label">Login/Register</span>
      </Link>
    </div>
  );
};
