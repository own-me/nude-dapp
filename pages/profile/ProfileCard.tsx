import React, { memo } from "react";
import styled from "styled-components";
import defaultProfile from "../../media/defaults/neon-missing-profile.svg";
import { shortenAddress } from "../../lib/helpers";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { Following } from "../../api/follow";

const ProfileCardContainer = styled(Link) <{ $isDarkMode: boolean }>`
    display: flex;
    color: ${props => props.$isDarkMode ? props.theme.dark.textColor : props.theme.light.textColor};
    font-family: Poppins,Open Sans;
    height: 400px;
    width: 290px;
    border: 1px solid #D8CBFF;
    border-radius: 10px;
    margin: 15px;
    text-align: center;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    position: relative;
    cursor: pointer;
    -webkit-transition: all 0.3s ease;
    transition: all 0.3s ease;
    -webkit-text-decoration: none;
    text-decoration: none;
    color: white;
    background: #0d0018;

    ::after {
        content: "";
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        background: rgba(244, 246, 248, 0.1);
        transition: background-color 100ms ease-out, opacity 100ms ease-out;
        opacity: 0;
    }
    :hover::after {
        opacity: 1;
    }
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    border-radius: 10px;
    background: linear-gradient(179.97deg, rgba(192, 192, 192, 0) 72.12%, #2D2D2D 99.97%);
`;

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 20px;
    z-index: 3;
    border-radius: 10px;
    background-image: linear-gradient(to bottom, transparent, transparent, #100016c9);
    width: 100%;
    text-align: left;
`;

const ProfileName = styled.div`
    font-size: 25px;
`;

const ProfileAddress = styled.div`
    font-size: 18px;
`;

interface ProfileCardProps {
    user?: Following;
    className?: string;
}

const ProfileCard = memo(({ user, className }: ProfileCardProps) => {
    const isDarkMode = useAppSelector(state => state.app.isDarkMode);
    return (
        <ProfileCardContainer to={`/${user.toAddress}`} $isDarkMode={isDarkMode} className={className}>
            <ProfileImage src={user.toProfileImageUrl || defaultProfile} />
            <InfoContainer>
                <ProfileName>{user.name}</ProfileName>
                <ProfileAddress>{shortenAddress(user.toAddress, 16)}</ProfileAddress>
            </InfoContainer>
        </ProfileCardContainer>
    );
});

export default ProfileCard;