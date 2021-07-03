import React from "react";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { setUserLoggedIn } from "../redux/slices/user";

const LogoutButtonContainer = styled.button`
    color: purple;
`;

export default function LogoutButton() {
    const dispatch = useAppDispatch();

    const handleLogout = () => {
        dispatch(setUserLoggedIn(false));
    };

    return (
        <LogoutButtonContainer onClick={handleLogout}>
            Logout
        </LogoutButtonContainer>
    );
};