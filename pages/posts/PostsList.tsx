import React, { memo } from "react";
import styled from "styled-components";
import defaultProfile from "../../media/defaults/missing-profile.png";
import { Post } from "../../redux/api/posts";
import { HeartOutlined, CommentOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

const PostsListContainer = styled.div`
    font-family: Poppins, Open Sans;
    border-bottom: 1px solid #ebebeb;
`;

const PostContainer = styled(Link)<{ $isDarkMode: boolean }>`
    display: flex;
    border-bottom: 1px #e0e0e0 solid;
    cursor: pointer;
    color: ${props => props.$isDarkMode ? props.theme.dark.textColor : props.theme.light.textColor};
    text-decoration: none;

    :hover {
        background-color: ${props => props.$isDarkMode ? "#170030" : "#fef9ff"};
    }
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

const PostUserName = styled(Link)<{ $isDarkMode: boolean }>`
    font-size: 20px;
    color: ${props => props.$isDarkMode ? props.theme.dark.textColor : props.theme.light.textColor};
    text-decoration: none;

    :hover {
        color: #bb00eb;
        text-decoration: underline;
    }
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

const PostImage = styled.img`
    width: 75%;
    height: 100%;
    margin-bottom: 10px;
`;

interface PostsListProps {
    posts: Post[];
}

const PostsList = memo(({ posts }: PostsListProps) => {
    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    return (
        <PostsListContainer>
            {posts && posts.map((post: Post, index) =>
                <PostContainer to={`/post/${post.id}`} key={index} $isDarkMode={isDarkMode}>
                    <PostProfileImage src={post.profileImageUrl || defaultProfile} />
                    <PostContent>
                        <PostUserName to={`/${post.userAddress}`} $isDarkMode={isDarkMode}>{post.userName}</PostUserName>
                        <PostText>{post.text}</PostText>
                        {post.imageUrl && <PostImage src={post.imageUrl} alt="post" />}
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