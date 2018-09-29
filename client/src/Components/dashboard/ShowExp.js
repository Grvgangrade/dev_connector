import React , { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteExperience } from '../../actions/profileAction';

class ShowExp extends Component{
    
    onDeleteHandler(id){
        this.props.deleteExperience(id);
    }
    
    render(){
        const experience = this.props.experience.map(exp => (
                <tr key={exp._id}>
                  <td>{exp.company}</td>
                  <td>{exp.title}</td>
                  <td>
                    <Moment format="YYYY/MM/DD">{exp.from}</Moment> - {' '}
                    {
                        exp.to === null ? ('Now') : <Moment format="YYYY/MM/DD">{exp.to}</Moment>
                    }
                  </td>
                  <td>
                    <button className="btn btn-danger"
                            onClick={(e) => {this.onDeleteHandler(exp._id)} }>
                      Delete
                    </button>
                  </td>
                </tr>
        )
    )
        
        return(
            <div>
                <h4 className="mb-2">Experience Credentials</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>Company</th>
                      <th>Title</th>
                      <th>Years</th>
                    </tr>
                    {experience}
                  </thead>
                </table>
            </div>
        );
    }
    
} 

export default connect(null , { deleteExperience} )(ShowExp);