import React, { Component } from "react";

const btnStyle = {
   width: "45%",
   marginRight: "10px"
};

class LicenseForm extends Component {
   render() {
      return (
         <div>
            <div className="mb-3">
               <label className="form-label">Numero di patente</label>
               <input type="text" className="form-control" name="licenseNumber" placeholder="U1H68I903B" onChange={this.props.onChange} />
            </div>
            <div className="mb-3">
               <label className="form-label">Ente di rilascio</label>
               <input type="text" className="form-control" name="releasedFrom" placeholder="MC-RM" onChange={this.props.onChange} />
            </div>
            <div className="mb-3">
               <label className="form-label">Data di rilascio</label>
               <input type="date" className="form-control" name="releaseDate" placeholder="01/01/2017" onChange={this.props.onChange} />
            </div>
            <div className="mb-4">
               <label className="form-label">Data di scadenza</label>
               <input type="date" className="form-control" name="expirationDate" placeholder="01/01/2023" onChange={this.props.onChange} />
            </div>
            <div className="form-check">
               <input className="form-check-input" type="checkbox" name="A1" onChange={this.props.onChange} />
               <label className="form-check-label">A1</label>
            </div>
            <div className="form-check">
               <input className="form-check-input" type="checkbox" name="A2" onChange={this.props.onChange} />
               <label className="form-check-label">A2</label>
            </div>
            <div className="form-check">
               <input className="form-check-input" type="checkbox" name="A3" onChange={this.props.onChange} />
               <label className="form-check-label">A3</label>
            </div>
            <div className="form-check mb-4">
               <input className="form-check-input" type="checkbox" name="B" onChange={this.props.onChange} />
               <label className="form-check-label">B</label>
            </div>
            <button style={btnStyle} className="btn btn-outline-secondary" onClick={this.props.skip}>Salta</button>
            <button style={btnStyle} className="btn btn-warning" onClick={this.props.validate}>Avanti</button>
            {
               this.props.isVisible
               ? <div className="alert alert-danger">{this.props.errorMessage}</div>
               : null
            }
         </div>
      );
   }
}

export default LicenseForm;