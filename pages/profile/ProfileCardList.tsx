import React, { memo } from "react";
import styled from "styled-components";
import { Following } from "../../api/follow";
import ProfileCard from "./ProfileCard";

const ProfileCardListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

interface ProfileCardListProps {
    users?: Following[];
    className?: string;
}

const ProfileCardList = memo(({ users = [], className }: ProfileCardListProps) => {
    return (
        <ProfileCardListContainer className={className}>
            {
                users.map((user: Following, index) =>
                    <ProfileCard user={user} key={index} />
                )
            }
        </ProfileCardListContainer>
    );
});

export default ProfileCardList;