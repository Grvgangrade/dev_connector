import React , { Component } from 'react';
import Moment from 'react-moment';

class ProfileCreds extends Component{
    render(){
        
        const {profile} = this.props;
        console.log(profile)
        
        const experience = profile.experience.map((exp,index) => (
            <li className="list-group-item" key={index}>
                  <h4>{exp.company}</h4>
                  <p><Moment format='YYYY/MM/DD'>{exp.from}</Moment> -{' '}
                    {exp.to === null ? ('Now') : (
                        <Moment format='YYYY/MM/DD'>{exp.to}</Moment>                             
                    )}
                  </p>    
                  <p>
                    <strong>Position:</strong> {exp.title}
                  </p>
                  {exp.description ?  <p>
                    <strong>Description:</strong> {exp.description}
                  </p> : null}
            </li>
        ))
        
        const education = profile.education.map((edu , index ) => (
            <li className="list-group-item" key={index}>
                  <h4>{edu.school}</h4>
                  <p>Sep 1993 - June 1999</p>
                  <p>
                    <strong>Degree: </strong>{edu.degree}</p>
                  <p>
                    <strong>Field Of Study: </strong>{edu.fieldofstudy}</p>
                <p>
                  <strong>Description:</strong> {edu.description}</p>
            </li>
        ))
        
        return(
          <div className="row">
            
            <div className="col-md-6">
              <h3 className="text-center text-info">Experience</h3>
              <ul className="list-group">
                {experience}
              </ul>
            </div>
            
            <div className="col-md-6">
              <h3 className="text-center text-info">Education</h3>
              <ul className="list-group">
                {education}
              </ul>
            </div>
            
          </div>
        )
    }
}

export default ProfileCreds;