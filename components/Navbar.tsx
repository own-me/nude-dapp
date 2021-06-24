import React from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import navLogo from "../media/navbar.png";

const NavbarContainer = styled.div`
    height: 50px;
    background-color: #ffe5e9;
    padding: 20px 30px;
`;

const NavLogo = styled.img`
    height: 100%;
`;

export default function Navbar() {
    const name = useAppSelector(state => state.user.name);
    const dispatch = useAppDispatch();

    return (
        <NavbarContainer>
            <NavLogo src={navLogo} />
        </NavbarContainer>
    )
}