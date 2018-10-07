import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getPost , addComment , deleteComment} from '../../actions/postsAction';
import Spinner from '../common/Spinner';
import TextAreaField from '../common/TextAreaField';

class PostComments extends Component{
    
    state = {
        text: '',
        errors: {}
    }

    onChangeHandler(e){
        this.setState({[e.target.name] : e.target.value })
    }

    onSubmitHandler(e, id){
        e.preventDefault();
        
        const commentData = {
            text : this.state.text,
            user : this.props.auth.user.id,
            name : this.props.auth.user.name,
            avatar : this.props.auth.user.avatar
        }
        this.props.addComment(commentData, id);
        this.setState({ text : ''})
    }
    
    componentDidMount(){
        if(this.props.match.params.id){
            this.props.getPost(this.props.match.params.id);
        }
    }
    
    componentWillReceiveProps(newProps){
        if(newProps.errors){
            this.setState({ errors : newProps.errors })
        }
    }

    deleteHandler(e , postId , commentId){
        e.preventDefault();
        console.log(postId , commentId);
        this.props.deleteComment(postId , commentId);
    }
    
    render(){
        
        const { post , loading } = this.props.posts;
        const { errors } = this.props;
        
        let displayPost, displayComments;
        if(post === null || loading){
            displayPost = <Spinner />
            displayComments = <Spinner />
        }else{
            displayPost = (
                <div className="card card-body mb-3">
                    <div className="row">
                      <div className="col-md-2">
                        <a href="profile.html">
                          <img className="rounded-circle d-none d-md-block" src={post.avatar}
                            alt="" />
                        </a>
                        <br />
                        <p className="text-center">{post.name}</p>
                      </div>
                      <div className="col-md-10">
                        <p className="lead">{post.text}</p>
                      </div>
                    </div>
                  </div>
                  )
            if(post.comment.length > 0 ){
                displayComments = (
                post.comment.map(comment =>
                    <div className="card card-body mb-3">
                      <div className="row">
                        <div className="col-md-2">
                          <a href="profile.html">
                            <img className="rounded-circle d-none d-md-block" src={comment.avatar} alt="" />
                          </a>
                          <br />
                          <p className="text-center">{comment.name}</p>
                        </div>
                        <div className="col-md-10">
                          <p className="lead">{comment.text}</p>
                                 
                        {comment.user === this.props.auth.user.id ? (<button type="button" 
                                                        onClick={(e) => {this.deleteHandler(e , post._id, comment._id)}} 
                                                        className="btn btn-danger mr-1">
                        <i className="fas fa-times" /> </button>) : null}
                        </div>
                      </div>
                    </div>
                )
            )
            }
            
        }
        
        return(
        <div className="post">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
            
                        {displayPost}

                          <div className="post-form mb-3">
                            <div className="card card-info">
                              <div className="card-header bg-info text-white">
                                Wanna Comment...
                              </div>
                              <div className="card-body">
                                <form onSubmit = {(e) => {this.onSubmitHandler(e, post._id)}}>
                                  <div className="form-group">
                                      <TextAreaField className="form-control form-control-lg" 
                                                    placeholder="Write a comment"
                                                    name="text"
                                                    value={this.state.text}
                                                    errors={errors.text} 
                                                    change={(e) => this.onChangeHandler(e)} />
                                  </div>
                                  <button type="submit" className="btn btn-dark">Submit</button>
                                </form>
                              </div>
                            </div>
                          </div>

                          <div className="comments">

                            {displayComments}

                          </div>
        </div>
      </div>
    </div>
  </div>
    )
    }
}

PostComments.propTypes = {
    posts : PropTypes.object.isRequired,
    getPost : PropTypes.func.isRequired,
    addComment : PropTypes.func.isRequired,
    errors : PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    posts :state.posts,
    auth: state.auth,
    errors : state.errors
})


export default connect(mapStateToProps , { getPost , addComment , deleteComment})(PostComments);