import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./VehicleCard.css";

class VehicleCard extends Component {
  render() {
    return (
      <div className="card">
        <div className="card-image">
          <img src={"http://85.234.131.131:7850/public" + this.props.img} alt="" />
        </div>
        <div className="card-body">
          <h5 className="card-title">{this.props.brand + " " + this.props.model}</h5>
          <Link to={"/vehicles/" + this.props.brand.toLowerCase() + "-" + this.props.model.toLowerCase()} className="btn btn-warning">Noleggia</Link>
        </div>
      </div>
    );
  }
}

export default VehicleCard;
