import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';


import { deletePost , like, unlike } from '../../actions/postsAction';

class PostItems extends Component{
    
    likeHandler(e , id){
        e.preventDefault();
        
        this.props.like(id)
    }
    
    unlikeHandler(e , id){
        e.preventDefault();
        
        this.props.unlike(id)
    }
    
    
    onClickHandler(e,id){
        e.preventDefault();
        
        this.props.deletePost(id);
    }
    
    findUserLike(likes){
        if(likes.filter(like => like.user === this.props.user).length > 0){
            return true;
        }else{
            return false;
        }
    }
    
    render(){
        const post = this.props.post;
        const {showAction} = this.props;
        
        const displayPosts = (
            <div className="card card-body mb-3" key={post._id} >
              <div className="row">
                <div className="col-md-2">
                  <a href={`profile/${this.props.user}`}>
                    <img className="rounded-circle d-none d-md-block" src={post.avatar} alt="" />
                  </a>
                  <br />
                  <p className="text-center">{post.name}</p>
                </div>
                <div className="col-md-10">
                    <p className="lead">{post.text}</p>
                {showAction ? (
                  <span> 
                    <button type="button" 
                            onClick={(e) => this.likeHandler(e, post._id) } 
                            className="btn btn-light mr-1">
                                <i className={classnames('fas fa-thumbs-up' , { 'text-info' : this.findUserLike(post.likes) })}></i>
                                <span className="badge badge-light">{post.likes.length}</span>
                    </button>
                    <button type="button" 
                            onClick={(e) => this.unlikeHandler(e, post._id) } 
                            className="btn btn-light mr-1">
                                <i className="text-secondary fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`post/${post._id}`} className="btn btn-info mr-1">
                        Comments
                    </Link>
                    {post.user === this.props.user ? (<button type="button" 
                                                        onClick={(e) => {this.onClickHandler(e , post._id)}} 
                                                        className="btn btn-danger mr-1">
                    <i className="fas fa-times" /> </button>) : null}
                    </span>) : null}
                    
                </div>
              </div>
            </div>
        )
        return(
        <div className="posts">
            {displayPosts}
          </div>
        )
    }
}

PostItems.defaultProps = {
    showAction : true
}

export default connect(null , { deletePost , like, unlike })(PostItems);