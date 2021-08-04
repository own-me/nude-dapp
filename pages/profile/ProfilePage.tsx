import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { useGetUserQuery, useUploadProfileImageMutation } from "../../redux/api/user";
import Navbar from "../../components/Navbar";
import ImageUpload from "../../components/ImageUpload";
import defaultBanner from "../../media/defaults/stars-banner.png";
import defaultProfile from "../../media/defaults/missing-profile.png";

const ProfilePageContainer = styled.div`
    height: 100%;
    width: 50%;
    margin: 90px auto 0 auto;
    background-color: white;
`;

const ProfileBannerImage = styled.img`
    width: 100%;
    height: 200px;
`;

const ProfileImage = styled.img`
    width: 150px;
    height: 150px;
    position: absolute;
    right: calc(50% - 75px);
    top: 190px;
    border-radius: 100%;
    border: 5px solid white;
    background: white;
`;

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const { data: userData, error: userError, isLoading: IsUserLoading } = useGetUserQuery({ name: window.location.pathname.split("/")[1] });
    const [postProfileImageUpload, {
        isLoading: isProfileImageLoading,
        isSuccess: isProfileImageSuccess,
        data: profileImageData,
        error: profileImageError
    }] = useUploadProfileImageMutation();

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    function handleProfileImage(image, type) {
        postProfileImageUpload({ name: userData.name, image, type });
    };

    return (
        <>
            <Navbar />
            <ProfilePageContainer>
                <ProfileBannerImage src={defaultBanner} />
                <ProfileImage src={defaultProfile} />
                {/* <h1>Profile: {userData?.name}</h1>
                <h1>Registration Date: {new Date(userData?.registrationDate).toLocaleDateString()}</h1>
                <h1>Last Login Date: {new Date(userData?.lastLoginDate).toLocaleDateString()}</h1>
                <h1>Birth Date: {userData?.birthDate}</h1>
                <ProfileImage src={userData?.profileImageUrl} alt="Profile Image" />
                <ImageUpload onImage={handleProfileImage} /> */}
            </ProfilePageContainer>
        </>
    );
};