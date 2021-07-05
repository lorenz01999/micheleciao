import React, { Component } from "react";

class UserDataForm extends Component {
   render() {
      return (
         <div>
            <div className="mb-3">
               <label className="form-label">Nome</label>
               <input type="text" className="form-control" name="name" placeholder="Mario" onChange={this.props.onChange} />
            </div>
            <div className="mb-3">
               <label className="form-label">Cognome</label>
               <input type="text" className="form-control" name="surname" placeholder="Rossi" onChange={this.props.onChange} />
            </div>
            <div className="mb-3">
               <label className="form-label">Codice fiscale</label>
               <input type="text" className="form-control" name="fiscalCode" placeholder="RSSMRA90A01H501W" maxLength="16" onChange={this.props.onChange} />
            </div>
            <div className="mb-3">
               <label className="form-label">Data di nascita</label>
               <input type="date" className="form-control" name="birthDate" onChange={this.props.onChange} />
            </div>
            <div className="mb-3">
               <label className="form-label">Luogo di nascita</label>
               <input type="text" className="form-control" name="birthPlace" placeholder="Roma" onChange={this.props.onChange} />
            </div>
            <div className="mb-3">
               <label className="form-label">Email</label>
               <input type="email" className="form-control" name="email" placeholder="mariorossi@gmail.com" onChange={this.props.onChange} />
            </div>
            <div className="mb-4">
               <label className="form-label">Password</label>
               <input type="password" className="form-control" name="password" placeholder="********" onChange={this.props.onChange} />
            </div>
            <button type="button" className="btn btn-warning w-100" onClick={this.props.validate}>Avanti</button>
            {
               this.props.isVisible
               ? <div className="alert alert-danger">{this.props.errorMessage}</div>
               : null
            }
         </div>
      );
   }
}

export default UserDataForm;