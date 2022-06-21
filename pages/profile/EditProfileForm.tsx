import React, { memo, useState, useEffect } from "react";
import styled, { css } from "styled-components";
import FormInput from "../../components/form/FormInput";
import FormTextArea from "../../components/form/FormTextArea";
import { useEditUserMutation, useUploadProfileImageMutation, useUploadProfileBannerMutation } from "../../api/user";
import { useNavigate } from "react-router-dom";
import FormFileInputButton from "../../components/form/FormFileInputButton";

const EditProfileFormContainer = styled.div`

`;

const Header = styled.h1`
    font-family: "Poppins", sans-serif;
    padding: 0px 40px 20px 40px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 0px;
`;

const BannerImage = styled.img`
    width: 100%;
    height: 180px;
`;

const ProfileImageContainer = styled.div`
    width: 150px;
    height: 150px;
    position: absolute;
    left: calc(50% - 75px);
    top: 160px;
`;

const ProfileImage = styled.img`
    width: 100%;
    height: 100%;
    border-radius: 100%;
    border: 5px solid white;
    background: white;
`;

const EditProfileImageButton = styled(FormFileInputButton)`
    position: absolute;
    top: 150px;
`;

const EditBannerButton = styled(FormFileInputButton)`
    position: absolute;
    top: 265px;
    left: 40px;
`;

const InputContainer = styled.div`
    margin-top: 60px;
    padding: 0px 40px;
    height: 430px;
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

const SaveButton = styled(Button) <{ $isDisabled?: boolean }>`
    width: 200px;
    margin-left: 30px;

    ${props => !props.$isDisabled && css`
        :hover {
            background-color: #ff31de;
        }
    `}
`;

const CancelButton = styled(Button) <{ $isDisabled?: boolean }>`
    background-color: #71A1FF;
    width: 130px;

    ${props => !props.$isDisabled && css`
        :hover {
            background-color: #2c73ff;
        }
    `}
`;

const CustomInput = styled(FormInput)`
    color: red !important;
`;

interface EditProfileFormProps {
    address: string;
    bannerImageUrl: string;
    profileImageUrl: string;
    currentName: string;
    currentBio: string;
    currentLink: string;
    onCancel: () => void;
    userRefetch: () => void;
}

const EditProfileForm = memo(({ address, bannerImageUrl, profileImageUrl, currentName, currentBio, currentLink, onCancel, userRefetch }: EditProfileFormProps) => {
    const navigate = useNavigate();

    const [name, setName] = useState<string>(currentName ?? "");
    const [bio, setBio] = useState<string>(currentBio ?? "");
    const [link, setLink] = useState<string>(currentLink ?? "");

    const [profileImagePreview, setProfileImagePreview] = useState<string>(null);
    const [profileImageFile, setProfileImageFile] = useState<File>(null);
    const [profileBannerPreview, setProfileBannerPreview] = useState<string>(null);
    const [profileBannerFile, setProfileBannerFile] = useState<File>(null);

    const [uploadProfileImage] = useUploadProfileImageMutation();
    const [uploadProfileBanner] = useUploadProfileBannerMutation();

    const [postEditUser, {
        isSuccess: isEditUserSuccess,
    }] = useEditUserMutation();

    const handleSave = async () => {
        if (profileImageFile) {
            const formData = new FormData();
            formData.append("image", profileImageFile);
            const ipfsResponse = await uploadProfileImage({ formData });
            console.log(ipfsResponse);
        }
        if (profileBannerFile) {
            const formData = new FormData();
            formData.append("image", profileBannerFile);
            const ipfsResponse = await uploadProfileBanner({ formData });
            console.log(ipfsResponse);
        }
        await postEditUser({
            name,
            bio,
            link
        });
    };

    useEffect(() => {
        if (isEditUserSuccess) {
            onCancel();
            navigate(`/${address}`);
            userRefetch();
        }
    }, [address, isEditUserSuccess, navigate, onCancel, userRefetch]);

    return (
        <EditProfileFormContainer>
            <Header>Edit Profile</Header>
            <BannerImage src={profileBannerPreview || bannerImageUrl} />
            <EditBannerButton
                onData={(data) => setProfileBannerPreview(data)}
                onFile={(file) => setProfileBannerFile(file)}
            >
                Edit Banner
            </EditBannerButton>
            <ProfileImageContainer>
                <ProfileImage src={profileImagePreview || profileImageUrl} />
                <EditProfileImageButton
                    onData={(data) => setProfileImagePreview(data)}
                    onFile={(file) => setProfileImageFile(file)}
                >
                    Edit Profile Image
                </EditProfileImageButton>
            </ProfileImageContainer>
            <InputContainer>
                <CustomInput
                    type="text"
                    label="Name"
                    onChange={(e) => setName(e.target.value)}
                    errorMessage="Name is required."
                    placeholder="What should people call you?"
                    inputValue={currentName}
                />
                <FormTextArea
                    label="Bio"
                    onChange={(value) => setBio(value)}
                    errorMessage="Bio is required."
                    placeHolder="Tell the world about yourself and everything you have to offer :)"
                    inputValue={currentBio}
                />
                <CustomInput
                    type="text"
                    label="Link"
                    onChange={(e) => setLink(e.target.value)}
                    errorMessage="Link is required."
                    placeholder="Add a URL or link to your website."
                    inputValue={currentLink}
                />
            </InputContainer>
            <Footer>
                <CancelButton onClick={onCancel}>Cancel</CancelButton>
                <SaveButton onClick={handleSave} $isDisabled={!name || !bio}>Save</SaveButton>
            </Footer>
        </EditProfileFormContainer>
    );
});

export default EditProfileForm;