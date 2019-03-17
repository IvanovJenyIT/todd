import React from 'react';
import './item-add-form.scss';

export default class ItemAddForm extends React.Component{

    state = {
        label:''
    };

    onLabelChange =(event)=> {
        this.setState({
            label: event.target.value
        })
    }

    onSubmit=(e)=>{
        e.preventDefault();
        this.props.onItemAdded(this.state.label)
        this.setState({
            label:''
        })
    }

    render(){
       return(
       <form className="item-add-form d-flex"
       onSubmit={this.onSubmit}>
           <input
            type="text"
            className="form-control"
            onChange={this.onLabelChange}
            placeholder='what needs to be done'
            value={this.state.label}
           />
           <button className="btn btn-outline-secondary">
               Add Item
           </button>
       </form>
       )
   }
};