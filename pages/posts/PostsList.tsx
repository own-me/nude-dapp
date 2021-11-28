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
    border-bottom: 1px #e0e0e0 solid;
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
    font-size: 20px;
`;

const PostContent = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    padding: 20px;
`;

const PostText = styled.div`
    white-space: break-spaces;
    font-size: 24px;
    padding: 20px 0px;
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
    font-size: 15px;
    opacity: 0.75;
`;

interface PostsListProps {
    posts: Post[];
}

const PostsList = memo(({ posts }: PostsListProps) => {
    return (
        <PostsListContainer>
            {posts && posts.reverse().map((post: Post, index) =>
                <PostContainer key={index}>
                    <PostProfileImage src={post.profileImageUrl || defaultProfile} />
                    <PostContent>
                        <PostUserName>{post.userName}</PostUserName>
                        <PostText>{post.text}</PostText>
                        <PostDate>
                            {new Date(post.dateCreated).toLocaleString()}
                        </PostDate>
                    </PostContent>
                    <PostActions>
                        <PostAction>
                            <PostActionValue>{post.likesCount}</PostActionValue>
                            <HeartOutlined />
                        </PostAction>
                        <PostAction>
                            <PostActionValue>{post.commentsCount}</PostActionValue>
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