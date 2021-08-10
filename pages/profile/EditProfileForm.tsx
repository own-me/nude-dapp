import React, { memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import MintFormInput from "../mint/MintFormInput";
import MintFormTextArea from "../mint/MintFormTextArea";

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

const ActionButton = styled.button`
    font-family: Poppins, Open Sans;
    font-size: 16px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 25px;
    margin: 10px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    cursor: pointer;
`;

const EditBannerButton = styled(ActionButton)`
    position: absolute;
    right: 15px;
    top: 210px;
`;

const EditProfileButton = styled(ActionButton)`
    position: absolute;
    left: calc(50% - 65px);
    top: 280px;
    background-color: #9A5CFF;
`;

const InputContainer = styled.div`
    margin-top: 60px;
    padding: 0px 40px;
    height: 305px;
    overflow-y: auto;
`;

const Footer = styled.div`
    float: right;
    padding: 0px 40px 40px 0px;
`;

const Button = styled.button<{ $isDisabled?: boolean }>`
    font-family: Poppins,Open Sans;
    font-size: 22px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    margin-left: 50px;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    cursor: pointer;

    ${props => props.$isDisabled && css`
        opacity: 0.5;
        cursor: not-allowed;
    `}
`;

const SaveButton = styled(Button)<{ $isDisabled?: boolean }>`
    width: 200px;
    margin-left: 30px;

    ${props => !props.$isDisabled && css`
        :hover {
            background-color: #ff31de;
        }
    `}
`;

const CancelButton = styled(Button)<{ $isDisabled?: boolean }>`
    background-color: #71A1FF;
    width: 130px;

    ${props => !props.$isDisabled && css`
        :hover {
            background-color: #2c73ff;
        }
    `}
`;

interface EditProfileFormProps {
    bannerImage: string;
    profileImage: string;
    onCancel: () => void;
}

const EditProfileForm = memo(({ bannerImage, profileImage, onCancel }: EditProfileFormProps) => {
    const [name, setName] = useState<string>("");
    const [bio, setBio] = useState<string>("");

    return (
        <EditProfileFormContainer>
            <Header>Edit Profile</Header>
            <BannerImage src={bannerImage} />
            <EditBannerButton onClick={() => console.log("save banner!")}>Edit Banner</EditBannerButton>
            <ProfileImage src={profileImage} />
            <EditProfileButton onClick={() => console.log("save banner!")}>Edit Banner</EditProfileButton>
            <InputContainer>
                <MintFormInput
                    type="text"
                    label="Name"
                    onChange={(value) => setName(value)}
                    errorMessage="Name is required."
                    placeHolder="What should people call you?"
                />
                <MintFormTextArea
                    label="Bio"
                    onChange={(value) => setBio(value)}
                    errorMessage="Bio is required."
                    placeHolder="Tell the world about yourself and everything you have to offer :)"
                />
            </InputContainer>
            <Footer>
                <CancelButton onClick={onCancel}>Cancel</CancelButton>
                <SaveButton onClick={() => console.log("save!")} $isDisabled={!name || !bio}>Save</SaveButton>
            </Footer>
        </EditProfileFormContainer>
    );
});

export default EditProfileForm;