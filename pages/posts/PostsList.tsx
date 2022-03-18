import React, { memo, useEffect } from "react";
import styled from "styled-components";
import defaultProfile from "../../media/defaults/missing-profile.png";
import { Post, useLikePostMutation, useUnlikePostMutation } from "../../api/posts";
import { HeartOutlined, HeartFilled, CommentOutlined, EllipsisOutlined } from "@ant-design/icons";
import { useAppSelector } from "../../redux/hooks";
import { Link } from "react-router-dom";

export const PostsListContainer = styled.div`
    font-family: Poppins, Open Sans;
`;

const PostContainer = styled(Link) <{ $isDarkMode: boolean }>`
    display: flex;
    border-bottom: 1px #d7d7d747 solid;
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

    :hover {
        .anticon {
            color: #D842FE;
        }
    }
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

const NoPostsMessage = styled.div`
    display: flex;
    justify-content: center;
    padding: 75px 20px;
    font-family: "Poppins", sans-serif;
`;

interface PostsListProps {
    posts: Post[];
    refreshPosts: () => void;
    className?: string;
}

const PostsList = memo(({ posts, refreshPosts, className }: PostsListProps) => {
    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    const [likePost, {
        isSuccess: likePostIsSuccess,
    }] = useLikePostMutation();

    const [unlikePost, {
        isSuccess: unlikePostIsSuccess,
    }] = useUnlikePostMutation();

    const handleLike = (e, postId: number) => {
        e.preventDefault();
        likePost({ postId });
        refreshPosts();
    };

    const handleUnlike = (e, postId: number) => {
        e.preventDefault();
        unlikePost({ postId });
    };

    useEffect(() => {
        refreshPosts();
    }, [likePostIsSuccess, unlikePostIsSuccess, refreshPosts]);

    return (
        <PostsListContainer className={className}>
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
                            {post?.isLiked ? <HeartFilled onClick={(e) => handleUnlike(e, post.id)} /> : <HeartOutlined onClick={(e) => handleLike(e, post.id)} />}
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
            {posts?.length === 0 && <NoPostsMessage>No posts yet...</NoPostsMessage>}
        </PostsListContainer>
    );
});

export default PostsList;