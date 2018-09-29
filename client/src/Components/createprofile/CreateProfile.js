import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import TextAreaField from '../common/TextAreaField';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { createProfile } from '../../actions/profileAction';

class CreateProfile extends Component{
        state = {
            handle:'',
            company:'',
            website:'',
            location:'',
            status:'',
            skills:'',
            githubusername:'',
            bio:'',
            twitter:'',
            facebook:'',
            linkedin:'',
            youtube:'',
            instagram:'',
            displaysocialinputs:false,
            errors:{}
        }

    onSubmitHandler(e){
        e.preventDefault();
        
        const profileData = {
            handle: this.state.handle,
            company:this.state.company,
            website:this.state.website,
            location:this.state.location,
            status:this.state.status,
            skills:this.state.skills,
            githubusername:this.state.githubusername,
            bio:this.state.bio,
            twitter:this.state.twitter,
            facebook:this.state.facebook,
            linkedin:this.state.linkedin,
            youtube:this.state.youtube,
            instagram:this.state.instagram
        }
        
        
        this.props.createProfile(profileData , this.props.history);
    }
    
    onChangeHandler(e){
        this.setState({[e.target.name] : e.target.value});
        console.log(this.state);
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors : nextProps.errors})
        }
        
        console.log(this.state.errors)
    }
    
    render(){
        
        const {errors, displaysocialinputs } = this.state;
        
        
        let socialInputs;
        
        if(displaysocialinputs){
            socialInputs = (
                <div>
                
                    <InputGroup 
                        name='twitter'
                        value={this.state.twitter}
                        icon="fab fa-twitter"
                        placeholder='Twitter Profile URL'
                        errors={errors.twitter}
                        change={(e) => this.onChangeHandler(e)} />
        
                    <InputGroup 
                        name='facebook'
                        value={this.state.facebook}
                        icon="fab fa-facebook"
                        placeholder='Facebook Profile URL'
                        errors={errors.facebook}
                        change={(e) => this.onChangeHandler(e)} />
                            
                    <InputGroup 
                        name='linkedin'
                        value={this.state.linkedin}
                        icon="fab fa-linkedin"
                        placeholder='LinkedIN Profile URL'
                        errors={errors.linkedin}
                        change={(e) => this.onChangeHandler(e)} />
                            
                    <InputGroup 
                        name='instagram'
                        value={this.state.instagram}
                        icon="fab fa-instagram"
                        placeholder='Instagram Page URL'
                        errors={errors.instagram}
                        change={(e) => this.onChangeHandler(e)} />
                            
                    <InputGroup 
                        name='youtube'
                        value={this.state.youtube}
                        icon="fab fa-youtube"
                        placeholder='Youtube Page URL'
                        errors={errors.youtube}
                        change={(e) => this.onChangeHandler(e)} />
                            
                </div>
            )
        }
        
        const option = [
                        {label: '* Select Professional Status' , value: 0},
                        {label: 'Manager' ,value: 'manager'},
                        {label: 'Developer' , value: 'developer'},
                        {label: 'Junior Developer' , value: 'junior developer'},
                        {label: 'Senior Developer' , value: 'senior developer'},
                        {label: 'Supervisor' , value: 'suepevisor'},
                        {label: 'Testor' , value: 'testor'},
                        {label: 'Student or Lerner' , value: 'student or learner'},
                        {label: 'Intern' , value: 'intern'},
                        {label: 'Tutor' , value: 'tutor'},
                        {label: 'Others' , value: 'others'}
                       ]
        return(
            <div className='create-profile' > 
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-8 m-auto'>
                            <h1 className='display-4 text-center'>Create Your Profile</h1>
                            <p className='lead text-center'>
                                Let's get some imformation to make your profile stand out..
                            </p>
                            <small className='d-block pb-3'>* = required fields</small>
                            <form onSubmit={(e) => this.onSubmitHandler(e) } >
                                <TextFieldGroup 
                                    name='handle'
                                    value={this.state.handle}
                                    placeholder='* Handle'
                                    change={(e) => this.onChangeHandler(e)} 
                                    errors={errors.handle} 
                                    info='A unique handle for your profile URL. Your full name , company name , nickname' />

                                <SelectListGroup 
                                    type='select'
                                    option={option}
                                    change={(e) => this.onChangeHandler(e)}
                                    errors={errors.status} 
                                    name='status'
                                    value={this.state.status} 
                                    info='Give us an idea of where you are at in your career'/>

                                <TextFieldGroup 
                                    name='company'
                                    value={this.state.company}
                                    placeholder='* Company'
                                    change={(e) => this.onChangeHandler(e)} 
                                    errors={errors.company}
                                    info='Could be your own company or one you work for' />

                                <TextFieldGroup 
                                    name='website'
                                    value={this.state.website}
                                    placeholder='Website'
                                    change={(e) => this.onChangeHandler(e)} 
                                    errors={errors.website}
                                    info='Could be your own websire or company one' />


                                <TextFieldGroup 
                                    name='location'
                                    value={this.state.location}
                                    placeholder='Location'
                                    change={(e) => this.onChangeHandler(e)} 
                                    errors={errors.location}
                                    info='City or city and state suggested (eg : Pune, MH)'/>

                                <TextFieldGroup 
                                    name='githubusername'
                                    value={this.state.githubusername}
                                    placeholder='Github Username'
                                    change={(e) => this.onChangeHandler(e)} 
                                    errors={errors.githubusername}
                                    info='If you want your lates repos or Github link , include your username'/>

                                <TextFieldGroup 
                                    name='skills'
                                    value={this.state.skills}
                                    placeholder='* Skills'
                                    change={(e) => this.onChangeHandler(e)} 
                                    errors={errors.skills}
                                    info='Please use comma separated values (HTML, CSS , JavaScript)'/>

                                <TextAreaField 
                                    name='bio'
                                    value={this.state.bio}
                                    placeholder='Short Bio'
                                    change={(e) => this.onChangeHandler(e)} 
                                    errors={errors.bio}
                                    info='Tell us a little about yourself'/>

                                <div className='mb-3'>
                                    <button onClick={(e) => this.setState(prevState =>({
                                                     displaysocialinputs : !prevState.displaysocialinputs
                                                    }))} className='btn btn-light'
                                                        type= 'button' >
                                        Add Social Network Links
                                    </button>
                                    <span className='text-muted'>Optional</span>
                                    {socialInputs}
                                </div>
                                
                                <input type='submit' className='btn btn-info btn-block mt-4' value='submit' />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

CreateProfile.propTypes = {
    user : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps , { createProfile })(CreateProfile);