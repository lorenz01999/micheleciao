import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";
//import { validateGasCar } from "./mymodule.js";

class Vehicle extends Component {
   constructor(props) {
      super(props);
      this.state = {
         type: "0",
         completed: false,
         isVisible: false,
         shift: false
      }
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
   }

   handleSubmit() {
      if(this.state.type == "0") {
        let data = {
         brand: this.state.brand,
         model: this.state.model,
         serialNumber: this.state.serialNumber.toUpperCase(),
         mainImage: this.state.mainImage,
         photos: this.state.photos,
         email: this.state.email,
         password: this.state.password,
         type: this.state.type,
         licensePlate: this.state.licensePlate,
         displacement: this.state.displacement,
         kilowatt: this.state.kilowatt,
         seats: this.state.seats,
         category: this.state.category,
         consumption: this.state.consumption,
         trunkSize: this.state.trunkSize,
         shift: this.state.shift,
         euro: this.state.euro,
         fuel: this.state.fuel,


        }
        axios.post("http://85.234.131.131:7850/staffs/addNewVehicle", data, {headers: {
         'Authorization': `Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6MiwiaWF0IjoxNjI1NDg1NTUyLCJleHAiOjE2MjU1NzE5NTIsImF1ZCI6ImxvY2FsaG9zdCIsImlzcyI6IlVSZW50YWwiLCJzdWIiOiJnYWJyaWVsZS5wYWxtZXJpQHRlc3QuaXQifQ.pIqU2bPZb7noTmaqrtMXhlNeNL1tFlb2znBHYc-6gK7pCWB8OQTy0XggHSJ-_THXf2z9Xx0zN1EGWTPUjJILJzNkaS0aj1aTUCL_EpOKXQMqIG8-TNhieL_3jVu1Z0kJF29lxS_1cS0MepF7V9y1_zaF3dLfcamjwcuFTomkF6A`,
         'Content-Type': 'multipart/form-data'}})
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
    }


   handleChange(event) {
   this.setState({
      [event.target.name]: event.target.value
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
                     
                           <div className="form-group col-lg-8">
                              <label>Brand</label>
                              <input type="text" name="brand" className="form-control" placeholder="Fiat" onChange={this.handleChange}/>
                           </div>
                           <div class="form-group col-lg-8">
                              <label>Model</label>
                              <input type="text" name="model" className="form-control" placeholder="Panda" onChange={this.handleChange}/>
                           </div>
                           <div class="form-group col-lg-8">
                              <label>Serial Number</label>
                              <input type="text" name="serialNumber" className="form-control" placeholder="989URH23HDB" onChange={this.handleChange}/>
                           </div>
                           <div class="form-group col-lg-8">
                              <label>Immagine Principale Veicolo</label>
                              <input type="file" name="mainImage" className="form-control" onChange={this.handleChange}/>
                           </div>
                           <div class="form-group col-lg-8">
                              <label> Altre Foto Veicolo</label>
                              <input type="file" name="photos" className="form-control" onChange={this.handleChange} multiple/>
                           </div>
                           <div class="form-group col-lg-8">
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
                              this.state.type == "0" || this.state.type == "1" || this.state.type =="2" || this.state.type == "3" ?
                              <div>
                                 <div className="form-group col-lg-8">
                                    <label>Targa</label>
                                    <input type="text" name="licensePlate" className="form-control" onChange={this.handleChange}/>
                                 </div>
                                 <div className="form-group col-lg-8">
                                    <label>Kilowatt</label>
                                    <input type="number" name="kilowatt" max="200" min="20" className="form-control"onChange={this.handleChange}/>
                                 </div>
                                 <div className="form-group col-lg-8">
                                    <label>Categoria</label>
                                    <input type="text" name="category" className="form-control" onChange={this.handleChange}/>
                                 </div>
                                 <div className="form-group col-lg-8">
                                    <label>Consumo</label>
                                    <input type="text" name="consumption" className="form-control" onChange={this.handleChange}/>
                                 </div>
                              </div>
                              : null
                           }

                           {  this.state.type == "0" || this.state.type == "2"?
                              <div className="form-group col-lg-8">
                                 <label>Cilindrata</label>
                                 <input type="text" name="displacement" className="form-control" onChange={this.handleChange}/>
                              </div>
                              
                              : null
                           }

                           {  this.state.type == "0" || this.state.type == "1" ?
                              <div className="form-group col-lg-8">
                              <label>Posti a sedere</label>
                              <input type="number" name="seats" max="10" min="2" className="form-control" onChange={this.handleChange}/>
                              </div>
                              : null
                           }
                           {
                              this.state.type == "0" || this.state.type == "2" ? 
                              <div>
                                 <div className="form-group col-lg-8">
                                    <input class="form-check-input" type="checkbox" name="shift" value="true" id="defaultCheck1" onChange={this.handleChange}/>
                                    <label class="form-check-label" for="defaultCheck1"> &nbsp;Ha il cambio manuale?</label>
                                 </div>
                                 <div class="form-group col-lg-8">
                                    <label>Euro</label>
                                    <input type="number" name="euro" className="form-control" onChange={this.handleChange}/>
                                 </div>
                                 <div class="form-group col-lg-8">
                                    <label>Fuel</label>
                                    <input type="text" name="fuel" className="form-control" onChange={this.handleChange}/>
                                 </div>
                              </div>
                              
                              : null
                           }

                           {
                              this.state.type == "0" || this.state.type == "1" ?
                              
                                 <div className="form-group col-lg-8">
                                    <label>TrunkSize</label>
                                    <input type="text" name="trunkSize" className="form-control" onChange={this.handleChange}/>
                                 </div>
                             
                              : null
                           }
                           {
                              this.state.type == "1"|| this.state.type == "3" || this.state.type == "4" || this.state.type == "5" ?
                              <div>
                                 <div className="form-group col-lg-8">
                                    <label>Capacit?? batteria</label>
                                    <input type="text" name="batteryCapacity" className="form-control" onChange={this.handleChange}/>
                                 </div>
                                 <div className="form-group col-lg-8">
                                    <label>Durata batteria</label>
                                    <input type="text" name="chargeDuration" className="form-control" onChange={this.handleChange}/>
                                 </div>

                              </div>
                              : null
                           }
                           
                           <button type="submit" className="btn btn-warning" onClick={this.handleSubmit}>Aggiungi Veicolo</button>
                     
                  </div>
               </div>
                   
            
            </div>
             
         </div>
       );
      }
   }
}

export default Vehicle;