import React from "react";
import styled from "styled-components";
import missingProfile from "../../media/missing-profile.png";

const Profile404Container = styled.div`
    min-height: 100%;
    width: 50%;
    margin: 0 auto;
    background-color: white;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Profile404Icon = styled.img`
    height: 20vh;
`;

const Profile404Text = styled.h2`
    font-family: Poppins, Open Sans;
    color: #FF81EB;
`;

export default function Profile404() {

    return (
        <Profile404Container>
            <Profile404Icon src={missingProfile} />
            <Profile404Text>PROFILE DOES NOT EXIST</Profile404Text>
        </Profile404Container>
    );
};