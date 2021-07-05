import React, { Component } from "react";
import "./Login.css";
import axios from "axios";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: "",
      isVisible: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit() {
    if(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+){1,2}$/.test(this.state.email)) {
      if(this.state.password !== "") {
        let data = {
          "email": this.state.email, 
          "password": this.state.password
        };
        axios.post("http://85.234.131.131:7850/users/auth", data)
          .then(res => {
            localStorage.setItem("token", res.data.token);
            this.props.updateNavbar();
            window.location = "http://localhost:3000/";
          })
          .catch(err => {
            this.setState({
              errorMessage: err.response.data.message,
              isVisible: true
            });
          });
      }
      else this.setState({errorMessage: "Inserisci la password", isVisible: true});
    } 
    else this.setState({errorMessage: "Inserisci una email valida", isVisible: true});
  }

  render() {
    return (
      <div className="container-fluid">
        <form>
          <h2 className="mb-5">Accedi al tuo account</h2>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" placeholder="mariorossi@gmail.com" onChange={this.handleChange} />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" placeholder="********" onChange={this.handleChange} />
          </div>
          <button type="button" className="btn btn-warning w-100" onClick={this.handleSubmit}>Accedi</button>
          {
            this.state.isVisible 
            ? <div className="alert alert-danger">{this.state.errorMessage}</div> 
            : null
          }
        </form>
      </div>
    );
  }
}

export default Login;
