import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { loginUser } from  '../../actions/authAction';
import TextFieldGroup from '../common/TextFieldGroup';

class Login extends Component {
    state = {
        email: '',
        password: '',
        errors : {}
    }

componentWillReceiveProps(nextProps) {
    if(nextProps.auth.isAuthenticated){
        this.props.history.push('/dashboard')
    }
    
    if(nextProps.errors) {
        this.setState({errors: nextProps.errors})
    }
}

changeHandler(e){
    this.setState({[e.target.name] : e.target.value})
}

submitHandler(e){
    e.preventDefault();
    
    const userData = {
        email: this.state.email,
        password: this.state.password
    }
    
    this.props.loginUser(userData);
    
//axios.post('/api/users/login' , loginUser)
//    .then(user => console.log(user.data))
//    .catch(err => this.setState({errors : err.response.data}));
}

    render(){
        const {errors} = this.state;
        
        return(
          <div className="login">
            <div className="container">
              <div className="row">
                <div className="col-md-8 m-auto">
                  <h1 className="display-4 text-center">Log In</h1>
                  <p className="lead text-center">Sign in to your DevConnector account</p>
                  <form onSubmit={(e) => this.submitHandler(e)}>
                    <TextFieldGroup 
                            type='text'
                            name='email'
                            value={this.state.email}
                            placeholder= 'Email'
                            errors= {errors.email}
                            change = {(e) => {this.changeHandler(e)}} />

                    <TextFieldGroup 
                            type='password'
                            name='password'
                            value={this.state.password}
                            placeholder= 'Password'
                            errors= {errors.password}
                            change = {(e) => {this.changeHandler(e)}} />

                    <input type="submit" 
                            className="btn btn-info btn-block mt-4" 
                            />
                  </form>
                </div>
              </div>
            </div>
          </div>
        )
    }
}

Login.propTypes = {
    loginUser : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => {
    return ({
        auth : state.auth,
        errors: state.errors
    })
}

export default connect(mapStateToProps , { loginUser } )(Login);