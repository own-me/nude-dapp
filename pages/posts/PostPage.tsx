import { CommentOutlined, EllipsisOutlined, HeartOutlined } from "@ant-design/icons";
import React, { memo } from "react";
import { Helmet } from "react-helmet";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import defaultProfile from "../../media/defaults/old-missing-profile.png";
import { useGetPostQuery } from "../../api/posts";
import { useAppSelector } from "../../redux/hooks";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";

const PostPageContainer = styled.div`
    width: 40%;
    min-width: 800px;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 1200px) {
        width: 90%;
    }
`;

const PostContainer = styled.div`
    display: flex;
    font-family: Poppins, Open Sans;
    border-bottom: 1px solid #ebebeb;
`;

const PostPageProfileImage = styled.img`
    width: 125px;
    height: 125px;
    border-radius: 100%;
    border: 5px solid white;
    background: white;
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    margin: 50px 20px;
`;

const PostUserName = styled(Link)<{ $isDarkMode: boolean }>`
    font-size: 30px;
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
    padding: 40px;
`;

const PostText = styled.div`
    white-space: break-spaces;
    font-size: 24px;
    padding: 20px 0px;
`;

const PostImage = styled.img`
    width: 75%;
    height: 100%;
    margin-bottom: 10px;
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

const PostPage = memo(() => {
    const params = useParams();
    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    const {
        data: postData,
        refetch: postRefetch
    } = useGetPostQuery({ postId: params.postId }, {
        skip: !params.postId,
    });

    return (
        <PostPageContainer>
            <Helmet>
                <title>Own Me | {`Post - ${postData?.text}`}</title>
            </Helmet>
            <PostContainer>
                <PostPageProfileImage src={postData?.profileImageUrl || defaultProfile} />
                <PostContent>
                    <PostUserName to={`/${postData?.userAddress}`} $isDarkMode={isDarkMode}>{postData?.userName}</PostUserName>
                    <PostText>{postData?.text}</PostText>
                    {postData?.imageUrl && <PostImage src={postData?.imageUrl} />}
                    <PostDate>
                        {new Date(postData?.dateCreated).toLocaleString()}
                    </PostDate>
                </PostContent>
                <PostActions>
                    <PostAction>
                        <PostActionValue>{postData?.likesCount || 0}</PostActionValue>
                        <HeartOutlined />
                    </PostAction>
                    <PostAction>
                        <PostActionValue>{postData?.commentsCount || 0}</PostActionValue>
                        <CommentOutlined />
                    </PostAction>
                    <PostAction>
                        <EllipsisOutlined />
                    </PostAction>
                </PostActions>
            </PostContainer>
            <CreatePost refetch={postRefetch} title={"Comment on this Post"} buttonText={"Comment"} childOf={postData?.id} />
            <PostsList posts={postData?.comments || []} refreshPosts={postRefetch} />
        </PostPageContainer>
    );
});

export default PostPage;