import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import navLogo from "../media/own-me-logo.svg";
import AccountButton from "./AccountButton";
import { useLocation } from "react-router-dom";
import { ZIndex } from "../lib/zindex";

export const NAVBAR_HEIGHT = 50;
export const NAVBAR_PADDING = 20;
export const TOTAL_HEIGHT = NAVBAR_HEIGHT + (NAVBAR_PADDING * 2);

const NavbarContainer = styled.div`
    height: ${NAVBAR_HEIGHT}px;
    background-color: white;
    padding: ${NAVBAR_PADDING}px;
    position: fixed;
    right: 0;
    left: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    z-index: ${ZIndex.NAVBAR};
    border-bottom: 1px solid #fdf3ff;
`;

const NavbarItems = styled.div`

`

const NavLink = styled(Link) <{ $isActive: boolean }>`
    font-family: Rock Salt, Open Sans; 
    margin: 0 50px;
    color: ${props => props.$isActive ? "#D842FE" : "rgb(216, 66, 254, 75%)"}; 
    text-decoration: none;
    font-size: 20px;
    font-weight: 600;
    padding: 20px;

    ${props => props.$isActive && "border-bottom: 3px solid #FF81EB;"}

    :hover {
        color: #FF81EB;
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

const Navbar = memo((props) => {
    const location = useLocation();
    return (
        <NavbarContainer>
            <NavLogo src={navLogo} />
            <NavbarItems>
                {
                    navLinks.map(({ text, link }, index) => {
                        return <NavLink to={link} key={index} $isActive={location.pathname === link}>{text}</NavLink>
                    })
                }
                <AccountButton />
            </NavbarItems>
        </NavbarContainer>
    );
});

export default Navbar;