import PropTypes from "prop-types";
import { Link } from "react-router-dom";

const Header = (props) => (
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <Link className="navbar-brand" to="/">{props.title}</Link>
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/todo">
              Todo
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/weather">
              Weather
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/team-leader" >
              Team Leader
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/developer" >
              Developer
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/about">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Header;

Header.propTypes = {
  title: PropTypes.string,
};
