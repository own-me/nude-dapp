import React, { memo, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import navLogo from "../media/own-me-logo.svg";
import AccountButton from "./AccountButton";
import { useLocation } from "react-router-dom";
import { ZIndex } from "../lib/zindex";
import hamburgerIcon from "../media/hamburger.svg";
import SideNav from "./SideNav";

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
    @media (max-width: 1550px) {
        display: none;
    }
`;

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

const Hamburger = styled.img`
    width: 35px;
    margin-left: 25px;
    cursor: pointer;
    transition: width 0.2s ease-in-out;

    :hover {
        width: 37px;
    }

    @media (min-width: 1550px) {
        display: none;
    }
`;

const NavButtons = styled.div`
    display: flex;
`;

export const navLinks = [
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
];

const Navbar = memo((props) => {
    const location = useLocation();

    const [isSideNavOpen, setIsSideNavOpen] = useState<boolean>(false);

    return (
        <>
            <NavbarContainer>
                <NavLogo src={navLogo} />
                <NavbarItems>
                    {
                        navLinks.map(({ text, link }, index) => {
                            return <NavLink to={link} key={index} $isActive={location.pathname === link}>{text}</NavLink>
                        })
                    }
                </NavbarItems>
                <NavButtons>
                    <AccountButton />
                    <Hamburger src={hamburgerIcon} onClick={() => setIsSideNavOpen(!isSideNavOpen)} />
                </NavButtons>
            </NavbarContainer>
            <SideNav isOpen={isSideNavOpen} setIsOpen={setIsSideNavOpen} />
        </>
    );
});

export default Navbar;