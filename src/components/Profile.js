import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";
import {validate4, createJSON, validate5, validate6} from "./mymodule";

class Profile extends Component {
   constructor(props) {
      super(props);
      this.state = {

         user: [],
         loaded: false,
         isVisible: false,
         A1: false,
         A2: false,
         A3: false,
         B: false,
          isCorrect: true
      };
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleSubmit1 = this.handleSubmit1.bind(this);
      this.handleDelete = this.handleDelete.bind(this);


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
            value = Boolean(!this.getValueOf(name))
        }
        this.setState({
            [name]: value
        });
    }


    handleSubmit() {

       if(!this.state.user.drivingLicense) {
           let res = validate4(this.state);
            if(res === true) {
                let data = {
                    licenseNumber: this.state.licenseNumber,
                    releasedFrom: this.state.releasedFrom,
                    releaseDate: this.state.releaseDate,
                    expirationDate: this.state.expirationDate,
                    A1: this.state.A1,
                    A2: this.state.A2,
                    A3: this.state.A3,
                    B: this.state.B
                }
                axios.post("http://85.234.131.131:7850/driving-license", data, {headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`}
                })
                    .then(res => {
                        window.location.reload();
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
        else {
            let ctrl = createJSON(this.state);
            let res = validate5(ctrl, this.state.user.drivingLicense);
            if(res.isVisible === false) {
                console.log(res.form);
                axios.post("http://85.234.131.131:7850/driving-license", res.form, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                })
                    .then(res => {
                        ;
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


    }

    handleSubmit1() {
        if(this.state.pin) {
            console.log(this.state.pin);
            let res = validate6(this.state.pin)
            if(res.isCorrect) {

                axios.put("http://85.234.131.131:7850/users/changePin", {newPin: this.state.pin}, {headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`}
                })
                    .then(res => {
                        window.location.reload();
                    })
                    .catch(err => {
                        this.setState({
                            errorMessage: err.response.data.message,
                            isCorrect: false
                        });
                    });
            }
            else {
                this.setState({
                    errorMessage: res.errorMessage,
                    isCorrect: res.isCorrect
                })
            }
        }
    }




    handleDelete() {
        axios.delete("http://85.234.131.131:7850/driving-license", {headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`}
        })
            .then(res => {
                window.location.reload();
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.response.data.message,
                    isVisible: true
                });
            });
    }

    componentDidMount() {
        axios.get('http://85.234.131.131:7850/users/profile', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                this.setState({
                    loaded: true,
                    user: res.data
                });
            })
            .catch(err => {
                console.log(err);
            })
    }



   render() {
       return (
            <div>
               <section id="profil">
                  <div className="container">
                     {
                        this.state.user.name && this.state.user.surname ? <h1>Ciao, {this.state.user.name} {this.state.user.surname}</h1> : null
                     }

                  </div>
               </section>
               <div className="container">
                  <div className="row">
                     <div className="col-sm-12 col-md-12 col-xs-12 col-lg-6">
                        <h3>Informazioni Utente</h3>
                        <div className="row">
                           <h5 className="col-sm-6 col-md-6 col-lg-6"> Nome</h5>
                           <div className="col-sm-4 col-md-6 col-lg-6">
                              <p className="lead">{this.state.user.name}</p>
                           </div>
                        </div>
                        <div className="row">
                           <h5 className="col-sm-6 col-md-6 col-lg-6">Cognome</h5>
                           <div className="col-sm-4 col-md-6 col-lg-6">
                              <p className="lead">{this.state.user.surname}</p>
                           </div>
                        </div>
                        <div className="row">
                           <h5 className="col-sm-6 col-md-6 col-lg-6">Codice Fiscale</h5>
                           <div className="col-sm-4 col-md-6 col-lg-6">
                              <p className="lead">{this.state.user.fiscalCode}</p>
                           </div>
                        </div>
                        <div className="row">
                           <h5 className="col-sm-6 col-md-6 col-lg-6">Data di nascita</h5>
                           <div className="col-sm-4 col-md-6 col-lg-6">
                              <p className="lead">{this.state.user.birthDate}</p>
                           </div>
                        </div>
                        <div className="row">
                           <h5 className="col-sm-6 col-md-6 col-lg-6">Luogo di nascita</h5>
                           <div className="col-sm-4 col-md-6 col-lg-6">
                              <p className="lead">{this.state.user.birthPlace}</p>
                           </div>
                        </div>
                        <div className="row">
                           <h5 className="col-sm-6 col-md-6 col-lg-6">Email</h5>
                           <div className="col-sm-4 col-md-6 col-lg-6">
                              <p className="lead">{this.state.user.email}</p>
                           </div>
                        </div>
                     </div>
                     <div className="col-sm-12 col-md-12 col-xs-12 col-lg-5">
                        <h3>Vuoi cambiare il PIN?</h3>

                           <div className="col-sm-10 col-md-12 col-lg-12">
                              <div className="form-group col-lg-8">
                                 <label>Inserisci il nuovo PIN</label>
                                 <input type="text"  name="pin" className="form-control" onChange={this.handleChange} placeholder={this.state.user.pin}/>
                              </div>
                              <button type="submit" className="btn btn-warning col-lg-8" onClick={this.handleSubmit1}>
                                  Invia
                              </button>
                               {
                                   this.state.isCorrect
                                       ? null
                                       : <div className="alert alert-danger col-lg-8">
                                           {this.state.errorMessage}
                                       </div>
                               }
                           </div>

                     </div>
                  </div>
               </div>
               <div className="container">
                  <hr/>

                  <div className="row">
                      {
                          this.state.user.drivingLicense ?
                          <div className="col-lg-6">
                              <h3>Patente</h3>
                              <div className="form-group col-lg-10">
                                  <label>Numero Patente</label>
                                  <input type="text" className="form-control" name="licenseNumber"
                                         placeholder={this.state.user.drivingLicense.licenseNumber }
                                         readOnly
                                        />
                              </div>
                              <div class="form-group col-lg-10">
                                  <label>Data di Rilascio</label>
                                  <input type="text" className="form-control" name="releaseDate"
                                         placeholder={this.state.user.drivingLicense.releaseDate}
                                         readOnly/>
                              </div>
                              <div class="form-group col-lg-10">
                                  <label>Data di Scadenza</label>
                                  <input type="text" className="form-control" name="expirationDate"
                                         placeholder={this.state.user.drivingLicense.expirationDate}
                                         readOnly />
                              </div>
                              <div class="form-group col-lg-10">
                                  <label>Ente di Rilascio</label>
                                  <input type="text" className="form-control" name="releasedFrom"
                                         placeholder={this.state.user.drivingLicense.releasedFrom}
                                         readOnly/>
                              </div>
                              <div class="form-group col-lg-10">
                                  <label>Categoria</label>
                                  <div className="form-check">
                                      <input className="form-check-input" type="checkbox" name="A1"
                                             checked={this.state.user.drivingLicense.A1}
                                      />
                                      <label className="form-check-label">A1</label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="checkbox" name="A2"
                                             checked={this.state.user.drivingLicense.A2}/>
                                      <label className="form-check-label">A2</label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="checkbox" name="A3"
                                             checked={ this.state.user.drivingLicense.A3}/>
                                      <label className="form-check-label">A3</label>
                                  </div>
                                  <div className="form-check">
                                      <input className="form-check-input" type="checkbox" name="B"
                                             checked={this.state.user.drivingLicense.B }/>
                                      <label className="form-check-label">B</label>
                                  </div>

                              </div>
                              {
                                  this.state.user.drivingLicense ?
                                      <div>
                                          <button type="submit" className="btn btn-danger col-lg-10"
                                                  onClick={this.handleDelete}>Elimina Patente
                                          </button>
                                      </div>

                                      : null

                              }
                              <br/>
                              <br/>
                              <br/>
                          </div>
                          : null
                      }
                      <div className="col-lg-6">
                          {
                              this.state.user.drivingLicense ?
                                  <h3>Modifica Patente</h3>  :
                                  <h3> Aggiungi Patente </h3>
                          }
                          <div className="form-group col-lg-10">
                              <label>Numero Patente</label>
                              <input type="text" className="form-control" name="licenseNumber"
                                     placeholder="AB6TTHUSDX"
                                     onChange={this.handleChange}/>
                          </div>
                          <div className="form-group col-lg-10">
                              <label>Data di Rilascio</label>
                              <input type="date" className="form-control" name="releaseDate"
                                     onChange={this.handleChange}/>
                          </div>
                          <div className="form-group col-lg-10">
                              <label>Data di Scadenza</label>
                              <input type="date" className="form-control" name="expirationDate"
                                     onChange={this.handleChange}/>
                          </div>
                          <div className="form-group col-lg-10">
                              <label>Ente di Rilascio</label>
                              <input type="text" className="form-control" name="releasedFrom"
                                     placeholder= "MC-PA"
                                     onChange={this.handleChange}/>
                          </div>
                          <div className="form-group col-lg-10">
                              <label>Categoria</label>
                              <div className="form-check">
                                  <input className="form-check-input" type="checkbox" name="A1"
                                         onChange={this.handleChange}/>
                                  <label className="form-check-label">A1</label>
                              </div>
                              <div className="form-check">
                                  <input className="form-check-input" type="checkbox" name="A2"
                                         onChange={this.handleChange}/>
                                  <label className="form-check-label">A2</label>
                              </div>
                              <div className="form-check">
                                  <input className="form-check-input" type="checkbox" name="A3"
                                         onChange={this.handleChange}/>
                                  <label className="form-check-label">A3</label>
                              </div>
                              <div className="form-check">
                                  <input className="form-check-input" type="checkbox" name="B"
                                         onChange={this.handleChange}/>
                                  <label className="form-check-label">B</label>
                              </div>


                          </div>
                          {
                              this.state.user.drivingLicense ?
                              <div>
                                  <button type="submit" className="btn btn-warning col-lg-10"
                                          onClick={this.handleSubmit}> Modifica Patente
                                  </button>
                              </div>
                              :
                                  <div>
                                      <button type="submit" className="btn btn-warning col-lg-10"
                                              onClick={this.handleSubmit}> Aggiungi Patente
                                      </button>
                                  </div>
                          }
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

export default Profile;