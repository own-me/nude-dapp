import React, { useEffect } from "react";
import { useGetUserQuery } from "../../redux/api/user";
import { useGetUserNftsQuery } from "../../redux/api/nft-db";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import Profile404 from "./Profile404";
import useWallet from "../../hooks/useWallet";

export default function ProfilePage() {

    const { address } = useWallet();

    const {
        data: userData,
        error: userError,
        isLoading: isUserLoading,
        refetch: userRefetch
    } = useGetUserQuery({ name: window.location.pathname.split("/")[1] });

    const {
        data: userNftsData,
        error: userNftsError,
        isLoading: isUserNftsLoading,
        refetch: userNftsRefetch
    } = useGetUserNftsQuery({ address }, {
        skip: !address,
    });

    useEffect(() => {
        console.log(userNftsData);
    }, [userNftsData]);

    useEffect(() => {
        console.log(address);
        userNftsRefetch()
    }, [address]);

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