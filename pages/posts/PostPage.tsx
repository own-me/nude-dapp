import { CommentOutlined, EllipsisOutlined, HeartOutlined } from "@ant-design/icons";
import React, { memo } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import defaultProfile from "../../media/defaults/missing-profile.png";
import { useGetPostQuery } from "../../redux/api/posts";
import CreatePost from "./CreatePost";

const PostPageContainer = styled.div`
    width: 70%;
    margin: 0 auto;
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

const PostUserName = styled.div`
    font-size: 30px;
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

    const {
        data: postData,
        refetch: postRefetch
    } = useGetPostQuery({ postId: params.postId }, {
        skip: !params.postId,
    });

    return (
        <PostPageContainer>
            <PostContainer>
                <PostPageProfileImage src={postData?.profileImageUrl || defaultProfile} />
                <PostContent>
                    <PostUserName>{postData?.userName}</PostUserName>
                    <PostText>{postData?.text}</PostText>
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
            <CreatePost refetch={postRefetch} title={"Comment on this Post"} buttonText={"Comment"} />
        </PostPageContainer>
    );
});

export default PostPage;