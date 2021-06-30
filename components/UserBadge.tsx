import React from "react";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";

const UserBadgeContainer = styled.div`
    color: purple;
`;

export default function UserBadge() {
    const email = useAppSelector(state => state.user.email);

    return (
        <UserBadgeContainer>
            {email}
        </UserBadgeContainer>
    );
};