import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router , Route , Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import jwt_decode from 'jwt-decode';

import Navbar from './Components/layout/navbar';
import Footer from './Components/layout/footer';
import Landing from './Components/layout/landing';
import Register from './Components/auth/register';
import Login from './Components/auth/login';
import Dashboard from './Components/dashboard/Dashboard';
import store from './store';
import {setCurrentUser , logoutUser } from './actions/authAction';
import { clearProfile } from './actions/profileAction';
import setAuthHeader from './utils/setAuthHeader';
import PrivateRoutes from './Components/common/PrivateRoutes'; 
import CreateProfile from './Components/createprofile/CreateProfile'; 
import EditProfile from './Components/editprofile/EditProfile'; 
import AddExp from './Components/addexperience/AddExp'; 
import AddEdu from './Components/addeducation/AddEdu'; 
import Profiles from './Components/profiles/Profiles'; 
import Profile from './Components/Profile/Profile'; 
import Posts from './Components/Posts/Posts'; 


class App extends Component {
  render() {
      if(localStorage.jwtToken){
          //set auth header
          setAuthHeader(localStorage.jwtToken)
          
          //decode jwt token
          const decoded = jwt_decode(localStorage.jwtToken)
          
          const currentTime = Date.now() / 1000;
          
          if(decoded.exp > currentTime) {
            store.dispatch(setCurrentUser(decoded))
          }else{
              localStorage.removeItem('jwtToken');
              setAuthHeader(false)
              store.dispatch(logoutUser());
              //clear current profile
              store.dispatch(clearProfile());
              window.location.href = '/login' ;
          }
      }
      
    return (
        <Provider store={store} >
          <Router>
            <div className="App" >
                    <Route path='/' component={Navbar }/>
                    <Route path='/' exact component={Landing} />
                    <Route path='/register' component={Register} />
                    <Route path='/login' component={Login} />
                    <Switch>
                        <PrivateRoutes path='/dashboard' component={Dashboard }/>  
                        <PrivateRoutes path='/create-profile' component={CreateProfile} />    
                        <PrivateRoutes path='/edit-profile' component={EditProfile} />
                        <PrivateRoutes path='/add-experience' component={AddExp} />
                        <PrivateRoutes path='/add-education' component={AddEdu} />
                        <PrivateRoutes path='/profiles' component={Profiles} />
                        <PrivateRoutes path='/profile/:handle' component={Profile} />
                        <PrivateRoutes path='/posts' component={Posts} />
                    </Switch>
                <Footer/>
            </div>
          </Router>
        </Provider>
    );
  }
}

export default App;
