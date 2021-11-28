import React, { memo } from "react";
import styled from "styled-components";
import defaultProfile from "../../media/defaults/missing-profile.png";
import { Post } from "../../redux/api/posts";
import { HeartOutlined, CommentOutlined, EllipsisOutlined } from "@ant-design/icons";

const PostsListContainer = styled.div`
    font-family: Poppins, Open Sans;
    border-bottom: 1px solid #ebebeb;
`;

const PostContainer = styled.div`
    display: flex;
`;

const PostProfileImage = styled.img`
    width: 125px;
    height: 125px;
    border-radius: 100%;
    border: 5px solid white;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin: 20px;
`;

const PostUserName = styled.div`
    font-size: 25px;
`;

const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
`;

const PostActions = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
    font-size: 25px;
`;

const PostAction = styled.div`
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: flex-end;
    padding-bottom: 10px;
`;

const PostActionValue = styled.div`
    padding-right: 5px;
`;

const PostDate = styled.div`
    
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
                        <PostUserName>{post.userName}</PostUserName>
                        <p>{post.text}</p>
                        <PostDate>
                            {new Date(post.dateCreated).toLocaleString()}
                        </PostDate>
                    </PostContent>
                    <PostActions>
                        <PostAction>
                            <PostActionValue>34</PostActionValue>
                            <HeartOutlined />
                        </PostAction>
                        <PostAction>
                            <PostActionValue>5</PostActionValue>
                            <CommentOutlined />
                        </PostAction>
                        <PostAction>
                            <EllipsisOutlined />
                        </PostAction>
                    </PostActions>
                </PostContainer>
            )}
        </PostsListContainer>
    );
});

export default PostsList;