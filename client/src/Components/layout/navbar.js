import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import { logoutUser } from '../../actions/authAction';
import { clearProfile } from '../../actions/profileAction';


class NavBar extends Component {
    logoutUser(e){
        e.preventDefault();
        this.props.clearProfile();
        this.props.logoutUser();
    }
    
    render(){
        const { user , isAuthenticated} = this.props.user;
        
        const authLinks = (
            <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                    <Link to='/posts' 
                        className='nav-link'> 
                        Post Feed
                    </Link>
                </li>
              <li className="nav-item">
                <a href='' 
                    onClick={(e) => this.logoutUser(e)} 
                    className='nav-link'> 
                        <img 
                            className='rounded circle'
                            src={user.avatar} 
                            alt={user.name} 
                            title='You must have a gravatar connected to your email to display an image'
                            style={{ width: '25px' ,  marginRight: '5px' }} />
                    {' '} Logout
                </a>
              </li>
            </ul>
        )
        
        const guestLinks = (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to='/register' className="nav-link" >Sign Up</Link>
              </li>
              <li className="nav-item">
                <Link to='/login' className="nav-link" >Login</Link>
              </li>
            </ul>
        )
                           
        return (
            <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-4">
            <div className="container">
                <a className="navbar-brand" href="landing.html">DevConnector</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#mobile-nav">
                    <span className="navbar-toggler-icon"></span>
            </button>

          <div className="collapse navbar-collapse" id="mobile-nav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link to='/profiles' className='nav-link' > Developers </Link>
              </li>
            </ul>
            
            {isAuthenticated ? authLinks : guestLinks}
            
          </div>
        </div>
      </nav>
        )
    }
    
componentDidMount(){
    if(this.props.user.isAuthenticated){
            this.props.history.push('/dashboard');
    }else {
        this.props.history.push('/')
    }
}
}

NavBar.propTypes = {
    logoutUser : PropTypes.func.isRequired,
    clearProfile : PropTypes.func.isRequired,
    user : PropTypes.object.isRequired
}


const mapStateToProps = state => {
    return({
        user : state.auth
    })
}

export default connect(mapStateToProps , { logoutUser , clearProfile})(NavBar);