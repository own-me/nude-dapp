import React, { useEffect } from "react";
import { useGetUserQuery } from "../../redux/api/user";
import { useGetUserNftsQuery } from "../../redux/api/nft-db";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import Profile404 from "./Profile404";
import useWallet from "../../hooks/useWallet";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserNfts } from "../../redux/slices/user";

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const userNfts = useAppSelector(state => state.user.nfts);

    const { address } = useWallet();

    const {
        data: userData,
        error: userError,
        isLoading: isUserLoading,
        refetch: userRefetch
    } = useGetUserQuery({ address: address });

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
        dispatch(setUserNfts(userNftsData?.userNfts));
    }, [userNftsData]);

    useEffect(() => {
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
                    userNfts={userNfts}
                />
            }
        </>
    );
};