import React, { Component } from "react";
import VehicleCard from "./VehicleCard";
import { Link } from "react-router-dom";
import "./Home.css";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicle: {},
      vehicles: {},
      key: 1
    };
  }

  componentDidMount() {
    axios.get("http://85.234.131.131:7850/vehicles/preview")
      .then(res => {
        this.setState({
          vehicle: res.data.cars[0]
        });
        res.data.cars.shift();
        this.setState({
          vehicles: res.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <section id="hero">
          <div className="image">
            { 
              this.state.vehicle.mainImage
              ? <img src={"http://85.234.131.131:7850/public" + this.state.vehicle.mainImage} alt="" />
              : null
            }
          </div>
          <div className="text">
            <h1>Hai bisogno di un veicolo? <br /> Sei nel posto giusto!</h1>
            <p>Noleggiamo auto, moto, biciclette e monopattici elettrici.</p>
            { 
              this.state.vehicle.brand && this.state.vehicle.model 
              ? <Link 
                  to={"/vehicles/" + this.state.vehicle.brand.toLowerCase() + "-" + this.state.vehicle.model.toLowerCase()} 
                  className="btn btn-warning">
                    Noleggia una {this.state.vehicle.brand + " " + this.state.vehicle.model}
                </Link>
              : null
            }
          </div>
        </section>
        <section id="cars">
          <h2>Auto</h2>
          <div className="preview">
            {
              this.state.vehicles.cars 
              ? this.state.vehicles.cars.map(vehicle => <VehicleCard key={this.state.key++} brand={vehicle.brand} model={vehicle.model} img={vehicle.mainImage} />) 
              : null
            }
            <div className="circle-btn-container">
              <Link to="/cars" className="circle-btn">Vedi altro</Link>
            </div>
          </div>
        </section>
        <section id="motorbikes">
          <h2>Moto</h2>
          <div className="preview">
            {
              this.state.vehicles.motorbikes 
              ? this.state.vehicles.motorbikes.map(vehicle => <VehicleCard key={this.state.key++} brand={vehicle.brand} model={vehicle.model} img={vehicle.mainImage} />) 
              : null
            }
            <div className="circle-btn-container">
              <Link to="/motorbikes" className="circle-btn">Vedi altro</Link>
            </div>
          </div>
        </section>
        <section id="bike-and-scooter">
          <h2>Biciclette e monopattini</h2>
          <div className="preview">
            {
              this.state.vehicles.bike 
              ? this.state.vehicles.bike.map(vehicle => <VehicleCard key={this.state.key++} brand={vehicle.brand} model={vehicle.model} img={vehicle.mainImage} />) 
              : null
            }
            {
              this.state.vehicles.scooter 
              ? this.state.vehicles.scooter.map(vehicle => <VehicleCard key={this.state.key++} brand={vehicle.brand} model={vehicle.model} img={vehicle.mainImage} />) 
              : null
            }
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
