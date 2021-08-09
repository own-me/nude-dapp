import React, { memo } from "react";
import styled from "styled-components";

const EditProfileFormContainer = styled.div`

`;

const Header = styled.h1`
    font-family: "Poppins", sans-serif;
    padding: 0px 40px 20px 40px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 0px;
`

const BannerImage = styled.img`
    width: 100%;
    height: 180px;
`

const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    position: absolute;
    left: calc(50% - 75px);
    top: 160px;
    border-radius: 100%;
    border: 5px solid white;
    background: white;
`
interface EditProfileFormProps {
    bannerImage: string;
    profileImage: string;
}

const EditProfileForm = memo(({ bannerImage, profileImage }: EditProfileFormProps) => {
    return (
        <EditProfileFormContainer>
            <Header>Edit Profile</Header>
            <BannerImage src={bannerImage} />
            <ProfileImage src={profileImage} />
        </EditProfileFormContainer>
    );
});

export default EditProfileForm;