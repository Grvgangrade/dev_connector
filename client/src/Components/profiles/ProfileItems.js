import React , { Component } from 'react';
import { Link } from 'react-router-dom';

class ProfileItems extends Component{
    
    render(){
        const {profiles} = this.props;
        let displayProfiles = profiles.map((item) => (
        <div className="card card-body bg-light mb-3">
            <div className="row" >
                  <div className="col-2">
                    <img className="rounded-circle" src={item.user.avatar} alt="" />
                  </div>
            
                  <div className="col-lg-6 col-md-4 col-8">
                    <h3>{item.user.name}</h3>
                    <p>{item.status}  {item.company ? <span> at {item.company} </span> : null}</p>
                    <p>{item.location ? item.location : null }</p>
                    <Link to={`/profile/${item.handle}`} className="btn btn-info">View Profile</Link>
                  </div>
                  
                    
                  <div className="col-md-4 d-lg-block"  >
                    <h4>Skill Set</h4>
                    <ul className="list-group">
                        {item.skills.splice(0,4).map((skill,index) => (
                            <li className="list-group-item" key={index}>
                                <i className="fa fa-check pr-1"></i>{skill}
                            </li>
                        ))}
                    </ul>
                  </div>
            </div>
        </div>
        ))
        
        
        return(
            <div>
                    {displayProfiles }
            </div>
        )
    }
}

export default ProfileItems;