import React, { Component } from "react";

class Form extends Component {
   constructor(props) {
      super(props);
      this.handleChange = this.handleChange.bind(this);
   }

   handleChange(event) {
      this.props.onChange(event.target.name, event.target.value);
   }

   render() { 
      return (
         <div>
            <nav>
               <div className="nav nav-tabs" id="nav-tab" role="tablist">
                  <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#perhours" type="button" role="tab" aria-controls="perhours" aria-selected="true">Tariffa a ore</button>
                  {
                     !this.props.driver 
                     ? <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#perdays" type="button" role="tab" aria-controls="perdays" aria-selected="false">Tariffa a giorni</button> 
                     : null
                  }
               </div>
            </nav>
            <div className="tab-content">
               <div className="tab-pane fade show active" id="perhours" role="tabpanel">
                  <div className="mb-3">
                     <label className="form-label">Numero di ore</label>
                     <select className="form-select" name="duration" onChange={this.handleChange}>
                        {
                           [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(e => <option key={e} value={e}>{e}</option>)
                        }
                     </select>
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Data ritiro</label>
                     <input type="date" className="form-control" name="returnDate" onChange={this.handleChange} />
                  </div>
                  <div className="mb-4">
                     <label className="form-label">Ora ritiro</label>
                     <input type="time" className="form-control" name="returnHour" onChange={this.handleChange} />
                  </div>
                  <button type="button" className="btn btn-warning w-100">Verifica disponibilità</button>
               </div>
               <div className="tab-pane fade" id="perdays" role="tabpanel">
                  <div className="mb-3">
                     <label className="form-label">Data ritiro</label>
                     <input type="date" className="form-control" name="returnDate" onChange={this.handleChange} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Ora ritiro</label>
                     <input type="time" className="form-control" name="returnHour" onChange={this.handleChange} />
                  </div>
                  <div className="mb-3">
                     <label className="form-label">Data consegna</label>
                     <input type="date" className="form-control" name="deliveryDate" onChange={this.handleChange} />
                  </div>
                  <div className="mb-4">
                     <label className="form-label">Ora consegna</label>
                     <input type="time" className="form-control" name="deliveryHour" onChange={this.handleChange} />
                  </div>
                  <button type="button" className="btn btn-warning w-100">Verifica disponibilità</button>
               </div>
            </div>
         </div>
      );
   }
}
 
export default Form;