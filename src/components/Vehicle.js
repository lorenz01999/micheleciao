import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";
import FormData from "form-data"
import {validate3} from "./mymodule";

class Vehicle extends Component {
   constructor(props) {
      super(props);
      this.state = {
         type: "0",
         completed: false,
         isVisible: false,
         shift: "false"
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange1 = this.handleChange1.bind(this);
   }

   handleSubmit() {
       let form = new FormData();
       let res = validate3(this.state);
       if(res === true) {
           form.append('brand', this.state.brand)
           form.append('model', this.state.model);
           form.append('serialNumber', this.state.serialNumber.toUpperCase());
           form.append('type', this.state.type);
           form.append('hourlyPrice', this.state.hourlyPrice);
           form.append('dailyPrice', this.state.dailyPrice);

           switch (this.state.type){
               case "0":
               case "1":
               case "2":
               case "3":
                   form.append('mainImage', this.state.mainImage[0]);
                   for (let i = 0; i < this.state.photos.length; i++) {
                       form.append('photos', this.state.photos[i]);
                   }
                   break;
               default:
                   break;
           }

           let features = {}

           switch (this.state.type) {
               case "0":
                   form.append('driverPrice', this.state.driverPrice);

                   features["licensePlate"] = this.state.licensePlate;
                   features["displacement"] = this.state.displacement;
                   features["kilowatt"] = this.state.kilowatt;
                   features["seats"] = this.state.seats;
                   features["category"] = this.state.category;
                   features["consumption"] = this.state.consumption;
                   features["trunkSize"] = this.state.trunkSize;
                   features["shift"] = this.state.shift;
                   features["euro"] = this.state.euro;
                   features["fuel"] = this.state.fuel;
                   break;
               case "1":
                   form.append('driverPrice', this.state.driverPrice);

                   features["licensePlate"] = this.state.licensePlate;
                   features["kilowatt"] = this.state.kilowatt;
                   features["seats"] = this.state.seats;
                   features["category"] = this.state.category;
                   features["consumption"] = this.state.consumption;
                   features["trunkSize"] = this.state.trunkSize;
                   features["batteryCapacity"] = this.state.batteryCapacity;
                   features["chargeDuration"] = this.state.chargeDuration;
                   break;
               case "2":
                   features["licensePlate"] = this.state.licensePlate;
                   features["displacement"] = this.state.displacement;
                   features["kilowatt"] = this.state.kilowatt;
                   features["category"] = this.state.category;
                   features["consumption"] = this.state.consumption;
                   features["shift"] = this.state.shift;
                   features["euro"] = this.state.euro;
                   features["fuel"] = this.state.fuel;
                   break;
               case "3":
                   features["licensePlate"] = this.state.licensePlate;
                   features["kilowatt"] = this.state.kilowatt;
                   features["category"] = this.state.category;
                   features["consumption"] = this.state.consumption;
                   features["batteryCapacity"] = this.state.batteryCapacity;
                   features["chargeDuration"] = this.state.chargeDuration;
                   break;
               case "4":
               case "5":
                   features["batteryCapacity"] = this.state.batteryCapacity;
                   features["chargeDuration"] = this.state.chargeDuration;
                   break;

               default:
                   break;
           }

           form.append("features", JSON.stringify(features));

           axios.post("http://85.234.131.131:7850/staffs/addNewVehicle", form, {
               headers: {
                   'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MiwiaWF0IjoxNjI1Njg4NjEyLCJleHAiOjE2MjU2OTU4MTIsImF1ZCI6ImxvY2FsaG9zdCIsImlzcyI6IlVSZW50YWwiLCJzdWIiOiJnYWJyaWVsZS5wYWxtZXJpQHRlc3QuaXQifQ.GIW45O6myCXCmVaqPhBPO96bkVPhxPsHipU40C2zRT1PQC6uVA08Lxp55tO-vf5ciUkZMr5-XRE1rbWusW9hh3wvgCQxGvhe5Ns49NYvoUD5sx-KDRxUIYq7o5EGgxUgt9G12PN8P1upsGwnZCUUMqtcoOvharDQTpEJtJAi9Fw`
               }
           })
               .then(res => {
                   this.setState({
                       completed: true
                   });
               })
               .catch(err => {
                   this.setState({
                       errorMessage: err.response.data.message,
                       isVisible: true
                   });
               });
       }
       else {
           this.setState({
               errorMessage: res.errorMessage,
               isVisible: res.isVisible
           })
       }
    }


   handleChange(event) {
   this.setState({
      [event.target.name]: event.target.value
   });
   }
   handleChange1(event) {
      this.setState({
         [event.target.name]: event.target.files
      });
      }

    render () {
      if(this.state.completed) {
         return (
           <div className="container-fluid success">
             <h3>
               Inserimento riuscito
               <br /> 
             </h3>
           </div>
         );
         this.state.completed = false;
       }
      else {
       return (
         <div>

            <section id="profil">
               <div className="container">
                  <h1>Inserimento Veicoli</h1>
               </div>
            </section>
            <div className="container">
               <div className="row">
                  <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6">
                     
                           <div className="form-group col-lg-10">
                              <label>Brand</label>
                              <input type="text" name="brand" className="form-control" placeholder="Fiat" onChange={this.handleChange}/>
                           </div>
                           <div class="form-group col-lg-10">
                              <label>Model</label>
                              <input type="text" name="model" className="form-control" placeholder="Panda" onChange={this.handleChange}/>
                           </div>
                           <div class="form-group col-lg-10">
                              <label>Serial Number</label>
                              <input type="text" name="serialNumber" className="form-control" placeholder="989URH23HDB" onChange={this.handleChange}/>
                           </div>
                          <div className="form-group col-lg-10">
                              <label>Prezzo ad ora</label>
                              <input type="number" name="hourlyPrice" className="form-control" placeholder="1.23" onChange={this.handleChange}/>
                          </div>
                          <div className="form-group col-lg-10">
                              <label>Prezzo giornaliero</label>
                              <input type="number" name="dailyPrice" className="form-control" placeholder="12.34" onChange={this.handleChange}/>
                          </div>
                           <div class="form-group col-lg-10">
                              <label>Scegli il tipo di veicolo da inserire</label>
                              <select name="type" class="form-select" onChange={this.handleChange}>
                                 <option value="0">Gas Car</option>
                                 <option value="1">Eletric Car</option>
                                 <option value="2">Gas Motorbike</option>
                                 <option value="3">Electric Motorbike</option>
                                 <option value="4">Bike</option>
                                 <option value="5">Scooter</option>

                              </select>
                           </div>


                           {
                              this.state.type == "0" || this.state.type == "1" ?
                                <div>
                                  <div className="form-group col-lg-10">
                                      <label>Prezzo con autista</label>
                                      <input type="number" name="driverPrice" className="form-control" placeholder="12.34" onChange={this.handleChange}/>
                                  </div>
                                </div>
                                  : null
                           }

                           {
                              this.state.type == "0" || this.state.type == "1" || this.state.type =="2" || this.state.type == "3" ?
                              <div>
                                  <div className="form-group col-lg-10">
                                      <label>Immagine Principale Veicolo</label>
                                      <input type="file" name="mainImage" className="form-control"
                                             onChange={this.handleChange1}/>
                                  </div>
                                  <div className="form-group col-lg-10">
                                      <label> Altre Foto Veicolo</label>
                                      <input type="file" name="photos" className="form-control"
                                             onChange={this.handleChange1} multiple/>
                                  </div>
                                 <div className="form-group col-lg-10">
                                    <label>Targa</label>
                                    <input type="text" name="licensePlate" className="form-control" onChange={this.handleChange}/>
                                 </div>
                                 <div className="form-group col-lg-10">
                                    <label>Kilowatt</label>
                                    <input type="number" name="kilowatt" max="200" min="20" className="form-control"onChange={this.handleChange}/>
                                 </div>
                                 <div className="form-group col-lg-10">
                                    <label>Categoria</label>
                                    <input type="text" name="category" className="form-control" onChange={this.handleChange}/>
                                 </div>
                                 <div className="form-group col-lg-10">
                                    <label>Consumo</label>
                                    <input type="text" name="consumption" className="form-control" onChange={this.handleChange}/>
                                 </div>
                              </div>
                              : null
                           }

                           {  this.state.type == "0" || this.state.type == "2"?
                              <div className="form-group col-lg-10">
                                 <label>Cilindrata</label>
                                 <input type="text" name="displacement" className="form-control" onChange={this.handleChange}/>
                              </div>
                              
                              : null
                           }

                           {  this.state.type == "0" || this.state.type == "1" ?
                              <div className="form-group col-lg-10">
                              <label>Posti a sedere</label>
                              <input type="number" name="seats" max="10" min="2" className="form-control" onChange={this.handleChange}/>
                              </div>
                              : null
                           }
                           {
                              this.state.type == "0" || this.state.type == "2" ? 
                              <div>
                                 <div className="form-group col-lg-10">
                                    <input class="form-check-input" type="checkbox" name="shift" value="true" id="defaultCheck1" onChange={this.handleChange}/>
                                    <label class="form-check-label" for="defaultCheck1"> &nbsp;Ha il cambio manuale?</label>
                                 </div>
                                 <div class="form-group col-lg-10">
                                    <label>Euro</label>
                                    <input type="number" name="euro" className="form-control" onChange={this.handleChange}/>
                                 </div>
                                 <div class="form-group col-lg-10">
                                    <label>Fuel</label>
                                    <input type="text" name="fuel" className="form-control" onChange={this.handleChange}/>
                                 </div>
                              </div>
                              
                              : null
                           }

                           {
                              this.state.type == "0" || this.state.type == "1" ?
                              
                                 <div className="form-group col-lg-10">
                                    <label>TrunkSize</label>
                                    <input type="text" name="trunkSize" className="form-control" onChange={this.handleChange}/>
                                 </div>
                             
                              : null
                           }
                           {
                              this.state.type == "1"|| this.state.type == "3" || this.state.type == "4" || this.state.type == "5" ?
                              <div>
                                 <div className="form-group col-lg-10">
                                    <label>Capacità batteria</label>
                                    <input type="text" name="batteryCapacity" className="form-control" onChange={this.handleChange}/>
                                 </div>
                                 <div className="form-group col-lg-10">
                                    <label>Durata batteria</label>
                                    <input type="text" name="chargeDuration" className="form-control" onChange={this.handleChange}/>
                                 </div>

                              </div>
                              : null
                           }
                           
                           <button type="submit" className="btn btn-warning" onClick={this.handleSubmit}>Aggiungi Veicolo</button>
                          {
                              this.state.isVisible
                                  ? <div className="alert alert-danger col-lg-10">
                                      {this.state.errorMessage}
                                    </div>
                                  : null
                          }
                  </div>
               </div>
                   
            
            </div>
             
         </div>
       );
      }
   }
}

export default Vehicle;