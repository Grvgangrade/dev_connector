import React , { Component } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import ProfileItems from './ProfileItems';
import Spinner from '../common/Spinner';
import { getAllProfiles } from '../../actions/profileAction';


class Profiles extends Component{
    
    componentDidMount(){
        this.props.getAllProfiles();
    }
    
    render(){
            
        const { profiles , loading } = this.props.profile;
        let showProfiles = null;
        
        if(profiles === null || loading ){
           showProfiles = <Spinner />
        }else{
            if(profiles.length > 0){
                showProfiles = <ProfileItems profiles={profiles}/>
            }else{
                showProfiles = 'There are no profiles to display'
            }
        }
        
        return(
         <div className="profiles">
            <div className="container">
              <div className="row">
                <div className="col-md-12">
                  <h1 className="display-4 text-center">Developer Profiles</h1>
                  <p className="lead text-center">Browse and connect with developers</p>
                    {showProfiles}
                </div>
              </div>
            </div>
          </div>
        )
    }
}

Profiles.propTypes = {
    profile: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    profile : state.profile
})

export default connect(mapStateToProps , { getAllProfiles })(Profiles)