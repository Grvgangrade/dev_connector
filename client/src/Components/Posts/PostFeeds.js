import React , { Component } from 'react';

import PostItems from './PostItems';

class PostFeeds extends Component{
    render(){
        const {posts} = this.props;
        const user = this.props.user;
        return(
            posts.map(post => <PostItems post={post} user={user} key={post._id} />
                     )
        );
    }
}

export default PostFeeds;