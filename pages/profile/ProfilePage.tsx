import React, { useEffect } from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { useGetUserQuery } from "../../redux/api/user";
import Navbar from "../../components/Navbar";

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
            <h1>Profile</h1>
            </ProfilePageContainer>
        </>
    );
};