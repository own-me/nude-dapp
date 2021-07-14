import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";

const UserBadgeContainer = styled.div`
    color: purple;
`;

export default function UserBadge() {
    const email = useAppSelector(state => state.user.email);
    const name = useAppSelector(state => state.user.name);

    return (
        <UserBadgeContainer>
            <Link to={`/${name}`}>{email}</Link>
            <br />
            <br />
            <Link to={`/${name}`}>{name}</Link>
        </UserBadgeContainer>
    );
};