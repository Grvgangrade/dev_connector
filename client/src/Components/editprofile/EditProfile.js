import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import TextAreaField from '../common/TextAreaField';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import { createProfile , getProfile} from '../../actions/profileAction';
import isEmpty from '../../validations/isEmpty';

class EditProfile extends Component{
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
        
        console.log(profileData);
        
        this.props.createProfile(profileData , this.props.history);
    }
    
    onChangeHandler(e){
        this.setState({[e.target.name] : e.target.value});
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.errors){
            this.setState({errors : nextProps.errors})
        }
        
        if(nextProps.profile.profile){
            const {profile} = nextProps.profile;
            console.log(profile)
                    
            profile.location  = (!isEmpty(profile.location)) ? profile.location : '';
            profile.company  = (!isEmpty(profile.company)) ? profile.company : '';
            profile.website  = (!isEmpty(profile.website)) ? profile.website : '';
            profile.githubusername  = (!isEmpty(profile.githubusername)) ? profile.githubusername : '';
            profile.bio  = (!isEmpty(profile.bio)) ? profile.bio : '';
            
            //profile.handle = profile.handle;
            const skillsCSV = profile.skills.join(',');
            //profile.status = profile.status;

            profile.social = (!isEmpty(profile.social)) ? profile.social : {}
            profile.social.twitter  = (!isEmpty(profile.social.twitter)) ? profile.social.twitter : '';
            profile.social.facebook  = (!isEmpty(profile.social.facebook)) ? profile.social.facebook :'';
            profile.social.linkedin  = (!isEmpty(profile.social.linkedin)) ? profile.social.linkedin :'';
            profile.social.youtube  = (!isEmpty(profile.social.youtube)) ? profile.social.youtube :'';
            profile.social.instagram  = (!isEmpty(profile.social.instagram)) ? profile.social.instagram :'';
            
            
            this.setState({
                handle: profile.handle,
                company: profile.company,
                website: profile.website,
                location: profile.location,
                status: profile.status,
                skills: skillsCSV,
                githubusername: profile.githubusername,
                bio: profile.bio,
                twitter: profile.social.twitter,
                facebook: profile.social.facebook,
                linkedin: profile.social.linkedin,
                youtube: profile.social.youtube,
                instagram: profile.social.instagram
            })
            
            console.log(this.state)
        }
    }

    componentDidMount(){
        this.props.getProfile();
    }
    
    render(){
        
        const { errors, displaysocialinputs } = this.state;
        
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
                            <Link to="/dashboard" className="btn btn-light">
                                Go Back
                            </Link>
                            <h1 className='display-4 text-center'>Edit Your Profile</h1>
                    
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

EditProfile.propTypes = {
    user : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    user: state.auth,
    errors: state.errors,
    profile: state.profile
})

export default connect(mapStateToProps , { createProfile , getProfile })(EditProfile);