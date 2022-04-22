import React from "react";
import styled from "styled-components";
import instagram from "./../../media/icons/socials/white/instagram.svg";
import linkedin from "./../../media/icons/socials/white/linkedin.svg";
import twitter from "./../../media/icons/socials/white/twitter.svg";
import discord from "./../../media/icons/socials/white/discord.svg";
import medium from "./../../media/icons/socials/white/medium.svg";
import telegram from "./../../media/icons/socials/white/telegram.svg";

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
    }
];

const SocialsGrid = styled.div` 
    position: absolute;
    bottom: 1%;
    right: 0;
    color: white;
    display: flex;

    @media screen and (max-width: 640px){
        width: 100%;
        justify-content: space-around;
        padding: 10px 0px;
    }
`;

const SocialsIcon = styled.img`
    margin: 20px;
    width: 30px;
    height: auto;

    @media screen and (max-width: 640px){
        margin: 0;
        justify-content: space-between;
        width: 20px;
    }
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
            })}
        </SocialsGrid>
    );
};

export default LoginSocials;
