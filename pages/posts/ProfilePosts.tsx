import React, { memo } from "react";
import styled from "styled-components";
import { useGetUserPostsQuery } from "../../redux/api/posts";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";

const ProfilePostsContainer = styled.div`

`;

interface ProfilePostsProps {
    profileImageUrl?: string;
    profileAddress: string;
    userAddress: string;
}

const ProfilePosts = memo(({ profileImageUrl, profileAddress, userAddress }: ProfilePostsProps) => {

    const {
        data: userPosts
    } = useGetUserPostsQuery({ userAddress: profileAddress }, {
        skip: !profileAddress,
    });

    return (
        <ProfilePostsContainer>
            {userAddress === profileAddress && <CreatePost profileImageUrl={profileImageUrl} />}
            <PostsList posts={userPosts} />
        </ProfilePostsContainer>
    );
});

export default ProfilePosts;
