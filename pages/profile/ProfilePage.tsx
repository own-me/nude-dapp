import React from "react";
import { useGetUserQuery } from "../../redux/api/user";
import { useGetAllNftsQuery } from "../../redux/api/nft-db";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import Profile404 from "./Profile404";

export default function ProfilePage() {

    const {
        data: userData,
        error: userError,
        isLoading: isUserLoading,
        refetch: userRefetch
    } = useGetUserQuery({ name: window.location.pathname.split("/")[1] });

    const {
        data: getAllNftsData,
        error: getAllNftsError,
        isLoading: isGetAllNftsLoading,
        refetch: getAllNftsRefetch
    } = useGetAllNftsQuery({});

    return (
        <>
            <Navbar />
            {!isUserLoading && !userData && <Profile404 />}
            {!isUserLoading && userData && 
                <Profile 
                    name={userData.name} 
                    bio={userData.bio} 
                    profileId={userData.id} 
                    isFollowing={userData.isFollowing}
                    userRefetch={userRefetch}
                />
            }
        </>
    );
};