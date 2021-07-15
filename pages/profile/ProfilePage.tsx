import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { useGetUserQuery, useUploadProfileImageMutation } from "../../redux/api/user";
import Navbar from "../../components/Navbar";
import ImageUpload from "../../components/ImageUpload";

const ProfilePageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const { data: userData, error: userError, isLoading: IsUserLoading } = useGetUserQuery({ name: window.location.pathname.split("/")[1] });
    const [postProfileImageUpload, { isLoading: isProfileImageLoading, isSuccess: isProfileImageSuccess, data: profileImageData, error: profileImageError }] = useUploadProfileImageMutation();

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    function handleProfileImage(image) {
        console.log(image);
        postProfileImageUpload({ name: userData.name, image});
    };

    return (
        <>
            <Navbar />
            <ProfilePageContainer>
                <h1>Profile: {userData?.name}</h1>
                <h1>Registration Date: {new Date(userData?.registrationDate).toLocaleDateString()}</h1>
                <h1>Last Login Date: {new Date(userData?.lastLoginDate).toLocaleDateString()}</h1>
                <h1>Birth Date: {userData?.birthDate}</h1>
                <ImageUpload onImage={handleProfileImage} />
            </ProfilePageContainer>
        </>
    );
};