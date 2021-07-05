import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

class Navbar extends Component {
  constructor(props) {
    super(props); 
    this.logout = this.logout.bind(this);
  }

  logout() {
    localStorage.removeItem("token");
    this.props.logout();
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">urental</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            {
              this.props.isLogged
              ? <li className="nav-item">
                  <Link to="/profile" className="nav-link">Profilo</Link>
                </li>
              : null
            }
            {
              !this.props.isLogged
              ? <li className="nav-item">
                  <Link to="/login" className="btn btn-warning">Accedi</Link>
                </li>
              : null
            }
            {
              !this.props.isLogged
              ? <li className="nav-item">
                  <Link to="/signup" className="btn btn-outline-light">Registrati</Link>
                </li>
              : null
            }
            {
              this.props.isLogged
              ? <li className="nav-item">
                  <button type="button" className="btn btn-danger" onClick={this.logout}>Esci</button>
                </li>
              : null
            }
          </ul>
        </div>
      </nav>
    );
  }
}

export default Navbar;
