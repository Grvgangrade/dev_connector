import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getProfile , deleteUser } from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import ProfileContents from './ProfileContents';
import ShowExp from './ShowExp';
import ShowEdu from './ShowEdu';

class Dashboard extends Component {
    componentDidMount(){
        this.props.getProfile();
    }
    
    
    onDeleteHandler(e){
        e.preventDefault();
        this.props.deleteUser();
        localStorage.removeItem('jwtToken');
    }
    
    render(){
        const { user } = this.props.auth;
        const { profile , loading } = this.props.profile;
        
        let dashboardContent
        
        if(profile === null || loading) {
            dashboardContent = <Spinner />
        }else {
            if(Object.keys(profile).length > 0){                                   
                dashboardContent = (
            <div>        
                <p className='lead text-muted'><Link to= {`/profile/${profile.handle}`} >Welcome {user.name} </Link></p>
                <ProfileContents />
                <ShowExp experience={profile.experience}/>
                <ShowEdu education={profile.education}/>
                <div style={{ marginBottom : '60px'}} />
                <button className='btn btn-danger' 
                        onClick={(e) => this.onDeleteHandler(e)}>Delete Account </button>
            </div>
            
        )
            }else {
                dashboardContent = (
                    <div>
                        <p className='lead text-muted'>Welcome {user.name} </p>
                        <p> You have not created a profile, please add some info </p>
                        <Link to='/create-profile' className='btn btn-lg btn-info'>
                            Create Profile
                        </Link>
                    </div>
                )
            }
        }
        return(<div className='dashboard' >
                    <div className= 'container'>
                        <div className='row'>
                            <div className='col-md-12'>
                                <h1 className='display-4'>Dashboard</h1>
                                    {dashboardContent}    
                            </div>
                        </div>
                    </div>
                </div>
            )
    }
}

               
const mapStateToProps = state => ({
    auth : state.auth,
    profile : state.profile
})
               
export default connect(mapStateToProps , { getProfile , deleteUser })(Dashboard);