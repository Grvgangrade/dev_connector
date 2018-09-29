import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import ProfileHeader from './ProfileHeader';
import ProfileAbout from './ProfileAbout';
import ProfileCreds from './ProfileCreds';
import ProfileGithub from './ProfileGithub';
import { getProfileByHandle } from '../../actions/profileAction';
import Spinner from '../common/Spinner';

class Profile extends Component{
    
    
    componentDidMount(){
        if(this.props.match.params.handle){
            this.props.getProfileByHandle(this.props.match.params.handle)  
        }
    }
    


    render(){
        
        const { profile , loading } = this.props.profile;
        
        let displayProfile = null;
        
        if(profile === null || loading){
           displayProfile =  <Spinner />
        }else{
            displayProfile = (<div>
                                  <div className="row">
                                    <div className="col-md-6">
                                      <Link to="/profiles" className="btn btn-light mb-3 float-left">Back To Profiles</Link>
                                    </div>
                                    <div className="col-md-6" />
                                  </div>
                                        <ProfileHeader profile={profile}/>
                                        <ProfileAbout profile={profile}/>
                                        <ProfileCreds profile={profile} />
                                        <ProfileGithub />
                                </div>
                                  )
        }
        return(
            <div className="profile">
                <div className="container">
                    <div className="row">
                        <div className="col-md-12">
                              {displayProfile}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Profile.propTypes = {
    profile : PropTypes.object.isRequired,
    getProfileByHandle : PropTypes.func.isRequired
}


const mapStateToProps = state => ({
    profile : state.profile
})

export default connect(mapStateToProps , { getProfileByHandle })(Profile);