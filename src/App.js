import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import VehicleDetails from "./components/VehicleDetails";
import Checkout from "./components/Checkout";
import Cars from "./components/Cars";
import Motorbikes from "./components/Motorbikes";
import Profile from "./components/Profile";
import Vehicle from "./components/Vehicle";
import "./components/PageNotFound.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: this.verifyToken()
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    this.setState({
      isLogged: true
    });
  }

  logout() {
    this.setState({
      isLogged: false
    });
  }

  verifyToken() {
    let token = localStorage.getItem("token");
    if(token) {
    	token = JSON.parse(atob(token.split(".")[1]));
      let iat = new Date(token.iat * 1000); 
    	let exp = new Date(token.exp * 1000);
    	let current = new Date();
    	if(current >= iat && current <= exp) {
    		return true;
    	}
    	else {
    		localStorage.removeItem("token");
    		return false;
    	}
    }
  }

  render() {
    return (
      <Router>
        <Navbar isLogged={this.state.isLogged} logout={this.logout} />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/login">
            <Login updateNavbar={this.login} />
          </Route>
          <Route path="/signup" component={Signup} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/vehicles/:brand-:model" component={VehicleDetails} />
          <Route path="/cars" component={Cars} /> 
          <Route path="/motorbikes" component={Motorbikes} />
          <Route path="/profile" component={Profile}/>
          <Route path="/addVehicle" component={Vehicle}/>
          <Route>
            <div className="container-fluid" id="page-not-found">
              <h1>Errore 404</h1>
              <h2>Ops! Pagina non trovata</h2>
              <p>Forse hai aperto la pagina sbagliata, non sono riuscito a trovare la pagina che cercavi</p>
              <Link to="/" className="btn btn-warning">Vai alla home</Link>
            </div>
          </Route>
          
            
  
        </Switch>
      </Router>
    );
  }
}

export default App;
