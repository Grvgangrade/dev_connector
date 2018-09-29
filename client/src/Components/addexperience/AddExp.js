import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { addExp } from '../../actions/profileAction';
import TextAreaField from '../common/TextAreaField';
import TextFieldGroup from '../common/TextFieldGroup';



class AddExp extends Component{
    constructor(props){
        super(props);
        this.state = {
            title: '',
            company: '',
            location: '',
            from: '',
            to: '',
            description: '',
            current:false,
            errors: {}
        }
    }
    
    onSubmitHandler(e){
        e.preventDefault();
        
        const expData = {
            title: this.state.title,
            company: this.state.company,
            location: this.state.location,
            from: this.state.from,
            to: this.state.to,
            description: this.state.description,
            current:this.state.current
        }
        this.props.addExp(expData , this.props.history);
    }
    
    onChangeHandler(e){
        this.setState({ [e.target.name] : e.target.value })
    }
    
    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors : nextProps.errors})
        }
    }
    
    render(){
        
        const { errors } = this.state;
        return(
            <div className="section add-experience">
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <Link to="/dashboard" className="btn btn-light">
                        Go Back
                      </Link>
                      <h1 className="display-4 text-center">Add Your Experience</h1>
                      <p className="lead text-center">Add any developer/programming positions that you have had in the past</p>
                      <small className="d-block pb-3">* = required field</small>
                      <form onSubmit= {(e) => this.onSubmitHandler(e)}>
            
                        <TextFieldGroup 
                            type="text" 
                            placeholder="* Job Title" 
                            name="title"
                            value={this.state.title}
                            change={(e) => this.onChangeHandler(e)}
                            errors={errors.title}/>

                        <TextFieldGroup 
                            type="text" 
                            placeholder="* Company" 
                            name="company"
                            value={this.state.company}
                            change={(e) => this.onChangeHandler(e)}
                            errors={errors.company}/>
                     
            
                        <TextFieldGroup 
                            type="text" 
                            placeholder="Location" 
                            name="location"
                            value={this.state.location}
                            change={(e) => this.onChangeHandler(e)}
                            errors={errors.location}/>
            
            
                        <h6>From Date</h6>
                        <TextFieldGroup 
                            type="date" 
                            placeholder="From" 
                            name="from"
                            value={this.state.from}
                            change={(e) => this.onChangeHandler(e)}
                            errors={errors.from}/>
            
                        <h6>To Date</h6>
                        <TextFieldGroup 
                            type="date" 
                            placeholder="To" 
                            name="to"
                            value={this.state.to}
                            change={(e) => this.onChangeHandler(e)}
                            errors={errors.to}
                            disabled={this.state.disabled ? 'disabled' : ''}/>
            
                        <div className="form-check mb-4">
                          <input className="form-check-input" 
                                type="checkbox" 
                                name="current" 
                                value={this.state.current} 
                                id="current" 
                                onClick={(e) => this.setState({
                                         current : !this.state.current,
                                         disabled: !this.state.disabled
                                        })} />
                          <label className="form-check-label" for="current">
                            Current Job
                          </label>
                        </div>
            
                        <TextAreaField 
                            type="text" 
                            placeholder="Job Description" 
                            name="description"
                            value={this.state.description}
                            change={(e) => this.onChangeHandler(e)}
                            info= 'Some of your job responsibilities , etc.. '
                            errors={errors.description} />
            
                        <input type="submit" className="btn btn-info btn-block mt-4" />
                      </form>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

AddExp.propTypes = {
    profile : PropTypes.object.isRequired,
    addExp : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile : state.profile,
    errors: state.errors
});


export default connect(mapStateToProps , {addExp})(AddExp)