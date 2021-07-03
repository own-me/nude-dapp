import React from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

const ProfilePageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default function ProfilePage() {
    return (
        <>
            <Navbar />
            <ProfilePageContainer>
            <h1>Profile</h1>
            </ProfilePageContainer>
        </>
    );
};