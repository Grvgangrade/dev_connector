import React , { Component } from 'react';
import PropTypes from 'prop-types';
import PostFeeds from './PostFeeds';

class Posts extends Component{
    render(){
        
        //const {post , loading} = this.props;
        
       // const postsContent = if(posts)
        
        return(
            <div className='post'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-12'>
                            <PostFeeds />
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default Posts;