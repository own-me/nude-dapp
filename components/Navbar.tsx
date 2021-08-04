import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import navLogo from "../media/navbar.png";
import AccountButton from "./AccountButton";
import { useHistory } from "react-router-dom";

const NavbarContainer = styled.div`
    height: 50px;
    background-color: #FDE5FE;
    padding: 20px 30px;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const NavbarItems = styled.div`

`

const NavLink = styled(Link) <{ $isActive: boolean }>`
    font-family: Rock Salt, Open Sans; 
    margin: 0 50px;
    color: ${props => props.$isActive ? "#D842FE" : "rgb(216, 66, 254, 75%)"}; 
    text-decoration: none;
    font-size: 22px;
    font-weight: 600;

    ${props => props.$isActive && "border-bottom: 2px solid #dd9cff;"}

    :hover {
        color: #D842FE;
    }
`;

const NavLogo = styled.img`
    height: 100%;
`;

const navLinks = [
    {
        text: "Home",
        link: "/",
    },
    {
        text: "Candyshop",
        link: "/candyshop",
    },
    {
        text: "Auction House",
        link: "/auctionhouse",
    },
    {
        text: "Gumball Machine",
        link: "/gumballmachine",
    }
]

export default function Navbar() {
    const history = useHistory();

    return (
        <NavbarContainer>
            <NavLogo src={navLogo} />
            <NavbarItems>
                    {
                        navLinks.map(({ text, link }, index) => {
                            return <NavLink to={link} key={index} $isActive={history.location.pathname === link}>{text}</NavLink>
                        })
                    }
                <AccountButton />
            </NavbarItems>
        </NavbarContainer>
    );
};