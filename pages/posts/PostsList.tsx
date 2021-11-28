import React, { memo } from "react";
import styled from "styled-components";
import defaultProfile from "../../media/defaults/missing-profile.png";
import { Post } from "../../redux/api/posts";

const PostsListContainer = styled.div`
    display: flex;
    font-family: Poppins, Open Sans;
    border-bottom: 1px solid #ebebeb;
`;

const PostContainer = styled.div`

`;

const PostProfileImage = styled.img`
    width: 125px;
    height: 125px;
    border-radius: 100%;
    border: 5px solid white;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin: 50px 20px;
`;

const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
`;

interface PostsListProps {
    posts: unknown[];
}

const PostsList = memo(({ posts }: PostsListProps) => {
    return (
        <PostsListContainer>
            {posts && posts.map((post: Post) =>
                <PostContainer>
                    <PostProfileImage src={post.profileImageUrl || defaultProfile} />
                    <PostContent>
                        <h3>{post.userName}</h3>
                        <p>{post.text}</p>
                    </PostContent>
                </PostContainer>
            )}
        </PostsListContainer>
    );
});

export default PostsList;