import React, { memo } from "react";
import styled from "styled-components";
import { User } from "../../api/user";
import ProfileCard from "./ProfileCard";

const ProfileCardListContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
`;

interface ProfileCardListProps {
    users?: User[];
    className?: string;
}

const ProfileCardList = memo(({ users = [], className }: ProfileCardListProps) => {
    return (
        <ProfileCardListContainer className={className}>
            {
                users.map((user: User, index) =>
                    <ProfileCard user={user} key={index} />
                )
            }
        </ProfileCardListContainer>
    );
});

export default ProfileCardList;