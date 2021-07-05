import React, { Component } from "react";
import VehicleCard from "./VehicleCard";
import "./CarsMotorbikes.css";
import axios from "axios";

class Car extends Component {
  constructor(props){
    super(props);
    this.state = {
      vehicles: [],
      key: 1
    };
  }

  componentDidMount() {
    axios.get('http://85.234.131.131:7850/vehicles/cars')
      .then(res => {
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
      <div className="container-fluid">
        <h2>Le nostre auto</h2>
        <div className="grid">
          {
            this.state.vehicles.length 
            ? this.state.vehicles.map(vehicle => <VehicleCard key={this.state.key++} brand={vehicle.brand} model={vehicle.model} img={vehicle.mainImage} />) 
            : null
          }
        </div>
      </div>
    );
  }
}

export default Car;
