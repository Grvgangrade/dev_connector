import React , { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';


import TextAreaField from '../common/TextAreaField';
import { addPost } from '../../actions/postsAction';

class PostForm extends Component{
    state = {
        text : '',
        errors:{}
    }
    
    onSubmitHandler(e){
        e.preventDefault();
        const postData = {
            text: this.state.text,
            user : this.props.auth.user.id,
            name: this.props.auth.user.name,
            avatar: this.props.auth.user.avatar
        }
        this.props.addPost(postData , this.props.history)
        this.setState({text : '' })
    }
    
    onChangeHandler(e){
        this.setState({[e.target.name] : e.target.value});
    }

    componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }
    
    render(){
        const {errors} = this.state;
        
        return(
            <div className="post-form mb-3">
                <div className="card card-info">
                  <div className="card-header bg-info text-white">
                    Say Somthing...
                  </div>
                  <div className="card-body">
                    <form onSubmit={(e) => this.onSubmitHandler(e)}>
                      <div className="form-group">
                        <TextAreaField placeholder="Create a post" 
                                        name='text'
                                        change={(e) => this.onChangeHandler(e)}
                                        value={this.state.text} 
                                        errors= {errors.text}/>
                      </div>
                      <button type="submit" className="btn btn-dark">Submit</button>
                    </form>
                  </div>
                </div>
              </div>
        )
    }
}


PostForm.propTypes = {
    auth : PropTypes.object.isRequired,
    errors : PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth : state.auth,
    errors : state.errors
})

export default connect(mapStateToProps , { addPost })(PostForm) 