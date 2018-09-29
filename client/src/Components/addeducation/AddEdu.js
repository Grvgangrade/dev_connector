import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { addEdu } from '../../actions/profileAction';
import TextAreaField from '../common/TextAreaField';
import TextFieldGroup from '../common/TextFieldGroup';



class AddEdu extends Component{
    constructor(props){
        super(props);
        this.state = {
            school: '',
            degree: '',
            fieldofstudy: '',
            from: '',
            to: '',
            description: '',
            current:false,
            errors: {},
            disabled: false
        }
    }
    
    onSubmitHandler(e){
        e.preventDefault();
        
        const eduData = {
            school: this.state.school,
            degree: this.state.degree,
            fieldofstudy: this.state.fieldofstudy,
            from: this.state.from,
            to: this.state.to,
            description: this.state.description,
            current:this.state.current
        }
        this.props.addEdu(eduData , this.props.history);
    }
    
    onChangeHandler(e){
        this.setState({ [e.target.name] : e.target.value })
    }
    
    onCheckHandler(e){
        
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
                      <h1 className="display-4 text-center">Add Your Education</h1>
                      <p className="lead text-center">Add any school, bootcamp, etc that you have attended</p>
                      <small className="d-block pb-3">* = required field</small>
                      <form onSubmit= {(e) => this.onSubmitHandler(e)}>
            
                        <TextFieldGroup 
                            type="text" 
                            placeholder="* School or Bootcamp" 
                            name="school"
                            value={this.state.school}
                            change={(e) => this.onChangeHandler(e)}
                            errors={errors.school}/>

                        <TextFieldGroup 
                            type="text" 
                            placeholder="* Degree or Certification" 
                            name="degree"
                            value={this.state.degree}
                            change={(e) => this.onChangeHandler(e)}
                            errors={errors.degree}/>
                     
            
                        <TextFieldGroup 
                            type="text" 
                            placeholder="Field of Study" 
                            name="fieldofstudy"
                            value={this.state.fieldofstudy}
                            change={(e) => this.onChangeHandler(e)}
                            errors={errors.fieldofstudy}/>
            
            
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
                            disabled= {this.state.disabled ? 'disabled' : ''}/>
            
                        <div className="form-check mb-4">
                          <input className="form-check-input" 
                                type="checkbox" 
                                name="current" 
                                id="current" 
                                onChange={(e) => this.setState({
                                        current : !this.state.current ,
                                        disabled : !this.state.disabled
                                    })} />
                          <label className="form-check-label" htmlFor="current">
                            Current Job
                          </label>
                        </div>
            
                        <TextAreaField 
                            type="text" 
                            placeholder="Program Description" 
                            name="description"
                            value={this.state.description}
                            change={(e) => this.onChangeHandler(e)}
                            info= 'Tell us about your experience and what you learned'
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

AddEdu.propTypes = {
    profile : PropTypes.object.isRequired,
    addEdu : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    profile : state.profile,
    errors: state.errors
});

export default connect(mapStateToProps , {addEdu})(AddEdu)