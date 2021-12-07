import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import { Post, useGetUserPostsQuery } from "../../redux/api/posts";
import CreatePost from "./CreatePost";
import PostsList from "./PostsList";

const ProfilePostsContainer = styled.div`

`;

interface ProfilePostsProps {
    profileImageUrl?: string;
    profileAddress: string;
    userAddress: string;
    profileName: string;
}

const ProfilePosts = memo(({ profileImageUrl, profileAddress, userAddress, profileName }: ProfilePostsProps) => {
    const [parsedUserPosts, setParsedUserPosts] = useState<Post[]>([]);

    const {
        data: userPosts,
        refetch: userPostsRefetch
    } = useGetUserPostsQuery({ userAddress: profileAddress }, {
        skip: !profileAddress,
    });

    useEffect(() => {
        if (userPosts) {
            setParsedUserPosts(
                userPosts.map((post) => ({
                    ...post,
                    profileImageUrl,
                    userName: profileName
                }))
            );
        }
    }, [profileImageUrl, profileName, userPosts]);

    return (
        <ProfilePostsContainer>
            {userAddress === profileAddress && <CreatePost profileImageUrl={profileImageUrl} refetch={userPostsRefetch} />}
            <PostsList posts={parsedUserPosts} refreshPosts={userPostsRefetch} />
        </ProfilePostsContainer>
    );
});

export default ProfilePosts;
