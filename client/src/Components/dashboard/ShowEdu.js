import React , { Component } from 'react';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import {deleteEducation} from '../../actions/profileAction';


class ShowEdu extends Component{
    
    onDeleteHandler(id) {
        this.props.deleteEducation(id);
    }
    
    render(){
        const education = this.props.education.map(edu => (
                <tr key={edu._id}>
                  <td>{edu.school}</td>
                  <td>{edu.degree}</td>
                  <td>
                    <Moment format="YYYY/MM/DD">{edu.from}</Moment> - {' '}
                    {
                        edu.to === null ? ('Now') : <Moment format="YYYY/MM/DD">{edu.to}</Moment>
                    }
                  </td>
                  <td>
                    <button className="btn btn-danger"
                            onClick={(e) => this.onDeleteHandler(edu._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
        )
    )
        
        return(
            <div>
                <h4 className="mb-2">Eduaction Details</h4>
                <table className="table">
                  <thead>
                    <tr>
                      <th>School</th>
                      <th>Degree</th>
                      <th>Years</th>
                    </tr>
                    {education}
                  </thead>
                </table>
            </div>
        );
    }
    
} 


export default connect(null , { deleteEducation})(ShowEdu);