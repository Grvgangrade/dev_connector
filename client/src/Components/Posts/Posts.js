import React , { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {getPosts} from '../../actions/postsAction'
import PostFeeds from './PostFeeds';
import PostForm from './PostForm';
import Spinner from '../common/Spinner';

class Posts extends Component{
    
    componentDidMount(){
        this.props.getPosts();
    }
    
    
    render(){
        
        const {posts , loading } = this.props.posts;
        const userId = this.props.auth.user.id;
        
        let postsContent
        if(posts === null || loading){
            postsContent = <Spinner />
        }else{
            postsContent = <PostFeeds posts={posts} user={userId}/>
        }
        
        return(
            <div className='post'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <PostForm />
                            {postsContent}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
        
Posts.propTypes = {
    posts : PropTypes.object.isRequired,
    auth : PropTypes.object.isRequired,
    getPosts : PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    posts : state.posts,
    auth : state.auth
})

export default connect(mapStateToProps , {getPosts})(Posts);