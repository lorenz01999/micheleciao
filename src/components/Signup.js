import React, { Component } from "react";
import Stepper from 'bs-stepper';
import 'bs-stepper/dist/css/bs-stepper.min.css';
import UserDataForm from "./UserDataForm";
import LicenseForm from "./LicenseForm";
import { validate, validate2 } from "./mymodule.js";
import "./Signup.css";
import axios from "axios";

class Register extends Component {
   constructor(props) {
      super(props);
      this.state = {
         name: "",
         surname: "",
         fiscalCode: "",
         birthDate: "",
         birthPlace: "",
         email: "",
         password: "",
         pin: "",
         licenseNumber: "",
         releasedFrom: "",
         releaseDate: "",
         expirationDate: "",
         A1: false,
         A2: false,
         A3: false,
         B: false,
         skipLicense: false,
         errorMessage: "",
         isVisible: false,
         completed: false
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.validatePersonalData = this.validatePersonalData.bind(this);
      this.validateDrivingLicense = this.validateDrivingLicense.bind(this);
      this.skip = this.skip.bind(this);
   }

   componentDidMount() {
      let stepper = document.querySelector('#stepper');
      this.stepper = new Stepper(stepper, {
         linear: true,
         animation: true
      });
   }

   getValueOf(field) {
      if (field === "A1") return this.state.A1;
      if (field === "A2") return this.state.A2;
      if (field === "A3") return this.state.A3;
      if (field === "B") return this.state.B;
   }

   handleChange(event) {
      let type = event.target.type;
      let name = event.target.name;
      let value = event.target.value;
      if (type === "checkbox") {
         value = Boolean(!this.getValueOf(name));
      }
      this.setState({
         [name]: value
      });
   }

   handleSubmit() {
      if (/[0-9]{4}/.test(this.state.pin)) {
         let data = {
            name: this.state.name,
            surname: this.state.surname,
            fiscalCode: this.state.fiscalCode,
            birthDate: this.state.birthDate,
            birthPlace: this.state.birthPlace,
            email: this.state.email,
            password: this.state.password,
            pin: this.state.pin,
         }
         if (!this.state.skipLicense) {
            data.drivingLicense = {
               licenseNumber: this.state.licenseNumber,
               releasedFrom: this.state.releasedFrom,
               releaseDate: this.state.releaseDate,
               expirationDate: this.state.expirationDate,
               A1: this.state.A1,
               A2: this.state.A2,
               A3: this.state.A3,
               B: this.state.B
            }
         }
         axios.post("http://85.234.131.131:7850/users/register", data)
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
            errorMessage: "Il PIN deve essere composto da 4 cifre",
            isVisible: true
         });
      }
   }

   validatePersonalData() {
      let res = validate(this.state);
      if (res === true) {
         this.setState({
            isVisible: false
         });
         this.stepper.next();
      }
      else this.setState(res);
   }

   validateDrivingLicense() {
      let res = validate2(this.state);
      if (res === true) {
         this.setState({
            skipLicense: false,
            isVisible: false
         });
         this.stepper.next();
      }
      else this.setState(res);
   }

   skip() {
      this.setState({
         skipLicense: true,
         isVisible: false
      });
      this.stepper.next();
   }

   render() {
      if (this.state.completed) {
         return (
            <div class="container-fluid" id="completed">
               <h3>
                  Abbiamo inviato una email a &nbsp;
                  <span>{this.state.email}</span>
                  <br /> 
                  controlla la posta per la verificare il tuo account
               </h3>
            </div>
         );
      }
      else {
         return (
            <div className="container-fluid">
               <div id="stepper" className="bs-stepper">
                  <div className="bs-stepper-header">
                     <div className="step" data-target="#personal-data">
                        <button className="step-trigger">
                           <span className="bs-stepper-circle">1</span>
                           <span className="bs-stepper-label">Dati personali</span>
                        </button>
                     </div>
                     <div className="line"></div>
                     <div className="step" data-target="#license">
                        <button className="step-trigger">
                           <span className="bs-stepper-circle">2</span>
                           <span className="bs-stepper-label">Patente</span>
                        </button>
                     </div>
                     <div className="line"></div>
                     <div className="step" data-target="#pin">
                        <button className="step-trigger">
                           <span className="bs-stepper-circle">3</span>
                           <span className="bs-stepper-label">PIN</span>
                        </button>
                     </div>
                  </div>
                  <div className="bs-stepper-content">
                     <div>
                        <div id="personal-data" className="content">
                           <UserDataForm
                              onChange={this.handleChange}
                              validate={this.validatePersonalData}
                              isVisible={this.state.isVisible}
                              errorMessage={this.state.errorMessage}
                           />
                        </div>
                        <div id="license" className="content">
                           <button type="button" className="btn btn-outline-secondary mb-4" onClick={() => this.stepper.previous()}>Indietro</button>
                           <LicenseForm
                              onChange={this.handleChange}
                              validate={this.validateDrivingLicense}
                              isVisible={this.state.isVisible}
                              errorMessage={this.state.errorMessage}
                              skip={this.skip}
                           />
                        </div>
                        <div id="pin" className="content">
                           <button type="button" className="btn btn-outline-secondary mb-4" onClick={() => this.stepper.previous()}>Indietro</button>
                           <div className="mb-4">
                              <label className="form-label">PIN</label>
                              <input type="text" className="form-control" name="pin" placeholder="1234" maxLength="4" onChange={this.handleChange} />
                           </div>
                           <button type="button" className="btn btn-warning w-100" onClick={this.handleSubmit}>Registrati</button>
                           {
                              this.state.isVisible
                                 ? <div className="alert alert-danger">{this.state.errorMessage}</div>
                                 : null
                           }
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         );
      }
   }
}

export default Register;