import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { useGetUserQuery } from "../../redux/api/user";
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
    const { data, error, isLoading } = useGetUserQuery({ name: window.location.pathname.split("/")[1] });

    useEffect(() => {
        console.log(data);
    }, [data]);

    return (
        <>
            <Navbar />
            <ProfilePageContainer>
            <h1>Profile: {data?.name}</h1>
            <h1>Registration Date: {new Date(data?.registrationDate).toLocaleDateString()}</h1>
            <h1>Last Login Date: {new Date(data?.lastLoginDate).toLocaleDateString()}</h1>
            <h1>Birth Date: {data?.birthDate}</h1>
            <ImageUpload />
            </ProfilePageContainer>
        </>
    );
};