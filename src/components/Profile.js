import React, { Component } from "react";
import axios from "axios";
import "./Profile.css";

class Profile extends Component {
   constructor(props) {
      super(props);
      this.state = {
         user: [],
         loaded: false,
      };
      this.handleChange = this.handleChange.bind(this);
   }


   handleChange(event) {
      this.setState({
        [event.target.name]: event.target.value
      });
    }

    componentDidMount() {
      axios.get('http://85.234.131.131:7850/users/profile', {headers: {
         'Authorization': `Bearer ${localStorage.getItem('token')}`}})
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
      if(this.state.loaded){
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
                     <div className="col-lg-1">

                     </div>
                     <div className="col-sm-12 col-md-12 col-xs-12 col-lg-5">
                        <h3>Vuoi cambiare la password?</h3>
                        <div className="row">
                           <form action="" className="col-sm-10 col-md-12 col-lg-12">
                              <div className="form-group col-lg-8">
                                 <label>Inserisci la tua nuova password</label>
                                 <input type="password" className="form-control" placeholder="************"/>
                              </div>
                              <div class="form-group col-lg-8">
                                 <label>Reinserisci la password da te scelta</label>
                                 <input type="password" className="form-control" placeholder="************"/>
                              </div>
                              <button type="submit" className="btn btn-warning">Invia</button>
                           </form>
                        </div>   
                     </div>
                  </div>
               </div>
               <div className="container">
                  <hr/>
                  <h3>Patente</h3>
                  <div className="col-lg-4">
                     <form action="" className="col-sm-10 col-md-12 col-lg-12">
                        <div className="form-group col-lg-8">
                           <label>Numero Patente</label>
                           <input type="text" className="form-control"  placeholder={this.state.user.drivingLicense}/>
                        </div>
                        <div class="form-group col-lg-8">
                           <label>Data di Rilascio</label>
                           <input type="date" className="form-control"/>
                        </div>
                        <div class="form-group col-lg-8">
                           <label>Data di Scadenza</label>
                           <input type="date" className="form-control"/>
                        </div>
                        <div class="form-group col-lg-8">
                           <label>Ente di Rilascio</label>
                           <input type="text" className="form-control"  placeholder="MT-PA"/>
                        </div>
                        <div class="form-group col-lg-8">
                           <label>Categoria</label>
                           <input type="text" className="form-control" placeholder="B"/>
                        </div>
                        {
                              this.state.user.drivingLicense ? 
                              <div>
                                 <button type="submit" className="btn btn-warning col-lg-4">Modifica Patente</button>
                                 <button type="submit" className="btn btn-warning col-lg-4">Modifica Patente</button>
                              </div>
                              
                              : <div>
                              <button type="submit" className="btn btn-danger col-lg-5">Elimina Patente</button>
                              &nbsp;&nbsp;&nbsp;
                              <button type="submit" className="btn btn-warning col-lg-5">Modifica Patente</button>
                           </div>

                        }
                       
                     </form>
                     <br/>
                     <br/>
                     <br/>
                  </div>
                  
               </div>
            </div>
               
         
            

         
            
            
         );
      }
      else{
         return (
            <div>
               ciao
            </div>
         );
      }
   }
}

export default Profile;