import React, { Component } from "react";
import "./VehicleDetails.css";
import axios from "axios";

class VehicleDetails extends Component {
   constructor(props) {
      super(props);
      this.baseUrl = "http://85.234.131.131:7850/public";
      this.state = {
         loaded: false,
         key: 1,
         index: 0
      };
      this.handleChange = this.handleChange.bind(this);
   }

   componentDidMount() {
      axios.get("http://85.234.131.131:7850/vehicles/" + this.props.match.params.brand + "-" + this.props.match.params.model)
         .then(res => {
            this.setState({
               loaded: true,
               versions: res.data,
               selected: res.data.engines[0]
            });
         })
         .catch(err => {
            console.log(err);
         });
   }

   handleChange(event) {
      this.setState({
         selected: this.state.versions.engines[event.target.value],
         key: 1,
         index: 0
      });
   }

   displayEngineLabel(engine) {
      let label;
      if (engine.fuel) {
         label = engine.displacement + " " + engine.fuel + " ";
         if (engine.shift) {
            label += "Manuale";
         }
         else {
            label += "Automatico";
         }
      }
      else {
         label = "Elettrico"
      }
      return label;
   }

   render() {
      if (this.state.loaded) {
         return (
            <div>
               <div id="carousel" className="carousel slide" data-bs-ride="carousel">
                  <div className="carousel-inner">
                     {
                        <div className="carousel-item active">
                           <img src={this.baseUrl + this.state.selected.mainImage} alt="" />
                        </div>
                     }
                     {
                        this.state.selected.photos.map(image =>
                           <div className="carousel-item">
                              <img src={this.baseUrl + image} alt="" />
                           </div>
                        )
                     }
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carousel" data-bs-slide="prev">
                     <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                     <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carousel" data-bs-slide="next">
                     <span className="carousel-control-next-icon" aria-hidden="true"></span>
                     <span className="visually-hidden">Next</span>
                  </button>
               </div>
               <div className="info">
                  <h2>{this.state.versions.brand + " " + this.state.versions.model}</h2>
                  <select className="form-select" onChange={this.handleChange}>
                     {
                        this.state.versions.engines.map(engine => 
                           <option key={this.state.key++} value={this.state.index++}>
                              {this.displayEngineLabel(engine)}
                           </option>
                        )
                     }
                  </select>
                  <div className="mycards">
                     {
                        this.state.selected.kilowatt
                        ? <div className="mycard">
                              <h5>Potenza</h5>
                              <p>{this.state.selected.kilowatt} kw</p>
                           </div>
                        : null
                     }
                     {
                        this.state.selected.batteryCapacity
                        ?  <div className="mycard">
                              <h5>Capacità batterie</h5>
                              <p>{this.state.selected.batteryCapacity} kWh</p>
                           </div>
                        : null
                     }
                     {
                        this.state.selected.chargeDuration
                        ?  <div className="mycard">
                              <h5>Tempo di ricarica</h5>
                              <p>{this.state.selected.chargeDuration} ore</p>
                           </div>
                        : null
                     }
                     {
                        !this.state.selected.shift 
                        && (this.state.versions.type === "car" || this.state.versions.type === "motorbike")
                        && this.state.selected.batteryCapacity
                        ?  <div className="mycard">
                              <h5>Cambio</h5>
                              <p>Automatico</p>
                           </div>
                        : null
                     }
                     {
                        this.state.selected.consumption
                        ?  <div className="mycard">
                              <h5>Consumi</h5>
                              <p>{this.state.selected.consumption} l/100km</p>
                           </div>
                        : null
                     }
                     {
                        this.state.selected.euro
                        ?  <div className="mycard">
                              <h5>Euro</h5>
                              <p>{this.state.selected.euro}</p>
                           </div>
                        : null
                     }
                     {
                        this.state.selected.seats
                        ?  <div className="mycard">
                              <h5>Numero posti</h5>
                              <p>{this.state.selected.seats}</p>
                           </div>
                        : null
                     }
                     {
                        this.state.selected.trunkSize
                        ?  <div className="mycard">
                              <h5>Dimensione bagagliaio</h5>
                              <p>{this.state.selected.trunkSize} litri</p>
                           </div>
                        : null
                     }
                  </div>
                  <button type="button" className="btn btn-warning w-100">Avanti</button>
               </div>
            </div>
         );
      }
      else return null;
   }
}

export default VehicleDetails;

