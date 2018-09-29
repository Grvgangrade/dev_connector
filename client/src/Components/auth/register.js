import React , { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import TextFieldGroup from '../common/TextFieldGroup';
import {registerAction} from '../../actions/authAction';


class Register extends Component {
    state= {
        name:'',
        email:'',
        password:'',
        password2:'',
        errors: {}
    }

componentWillReceiveProps(nextProps) {
    if(nextProps.errors){
        this.setState({errors : nextProps.errors})
        console.log(this.state.errors);
    }
}

componentDidMount(){
    if(this.props.user.isAuthenticated){
            this.props.history.push('/dashboard');
    }
}

changeHandler(e){
    this.setState({[e.target.name] : e.target.value});
}

submitHandler(e){
    e.preventDefault();
    
    const newUser = {
        name: this.state.name,
        email: this.state.email,
        password: this.state.password,
        password2: this.state.password2
    }
    console.log(this.props.user);
    this.props.registerAction(newUser , this.props.history);
//axios.post('/api/users/register' , newUser)
//    .then(user => console.log(user.data))
//    .catch(err => this.setState({errors : err.response.data}));
}
    render(){
        const {errors}  = this.state;
        
        const {user} = this.props;
        return (
            <div className="register">
            {user.name ? user.name : null}
                <div className="container">
                  <div className="row">
                    <div className="col-md-8 m-auto">
                      <h1 className="display-4 text-center">Sign Up</h1>
                      <p className="lead text-center">Create your DevConnector account</p>
                      <form onSubmit={(e) => this.submitHandler()}>
                        
                          <TextFieldGroup type="text" 
                                placeholder="Name" 
                                name="name" 
                                value={this.state.name}
                                change={(e) => this.changeHandler(e)} 
                                errors={errors.name} required />
                                    
                            <TextFieldGroup type="text" 
                                placeholder="Email Address" 
                                name="email" 
                                value={this.state.email}
                                change={(e) => this.changeHandler(e)} 
                                info='This site uses Gravatar so if you want a profile image, use a Gravatar email' 
                                errors={errors.email} required />
                            
                            <TextFieldGroup type="password" 
                                placeholder="Password" 
                                name="password" 
                                value={this.state.password}
                                change={(e) => this.changeHandler(e)} 
                                errors={errors.password} required />
                                    
                            <TextFieldGroup type="password" 
                                placeholder="Confirm password" 
                                name="password2" 
                                value={this.state.password2}
                                change={(e) => this.changeHandler(e)} 
                                errors={errors.password2} required />
    
                       
                        <input type="submit" 
                                className="btn btn-info btn-block mt-4" 
                                onClick={(e) => {this.submitHandler(e)}}/>
                      </form>
                    </div>
                  </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return({
        user: state.auth,
        errors: state.errors
    })
}


export default connect(mapStateToProps , {registerAction})(withRouter(Register));