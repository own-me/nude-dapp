import React from "react";
import styled from "styled-components";
import navLogo from "../media/navbar.png";
import AccountButton from "./AccountButton";

const NavbarContainer = styled.div`
    height: 50px;
    background-color: #ffe5e9;
    padding: 20px 30px;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NavLogo = styled.img`
    height: 100%;
`;

export default function Navbar() {
    return (
        <NavbarContainer>
            <NavLogo src={navLogo} />
            <AccountButton />
        </NavbarContainer>
    );
};