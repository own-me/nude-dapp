import React from "react";
import styled from "styled-components";
import instagram from "./../../media/icons/socials/color/instagram.svg";
import linkedin from "./../../media/icons/socials/color/linkedin.svg";
import twitter from "./../../media/icons/socials/color/twitter.svg";
import discord from "./../../media/icons/socials/color/discord.svg";
import medium from "./../../media/icons/socials/color/medium.svg";
import telegram from "./../../media/icons/socials/color/telegram.svg";

const socialIcons = [
    {
        key: "twitter",
        icon: twitter,
        url: "https://twitter.com/own_me_nft"
    },
    {
        key: "instagram",
        icon: instagram,
        url: "https://www.instagram.com/own_me_nft/"
    },
    {
        key: "linkedin",
        icon: linkedin,
        url: "https://www.linkedin.com/company/own-me-nft"
    },
    {
        key: "medium",
        icon: medium,
        url: "https://medium.com/@own.me.nft"
    },
    {
        key: "telegram",
        icon: telegram,
        url: "https://t.me/own_me_nft"
    },
    {
        key: "discord",
        icon: discord,
        url: "https://discord.gg/Ww5nckNGpS"
    },

];

const SocialsGrid = styled.div` 
    position: absolute;
    bottom: 0%;
    right: 0%;
    color: white;
    width: auto;
    height: auto;
        @media screen and (max-width: 520px){
            align-content: center;
            grid-row: 2;
            column-count: 3;
        }
`;

const SocialsIcon = styled.img`
    margin: 25px;
    width: 35px;
    height: 34px;
`;

const LoginSocials = () => {
    return (
        <SocialsGrid>
            {socialIcons.map((value, index) => {
                return (
                    <a href={value.url} target="blank" key={index}>
                        <SocialsIcon src={value.icon} />
                    </a>
                );
            }
            )}
        </SocialsGrid>
    );
};
export default LoginSocials;


