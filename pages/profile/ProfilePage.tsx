import React, { memo, useEffect, useMemo } from "react";
import { useGetUserQuery } from "../../redux/api/user";
import { useGetUserNftsQuery } from "../../redux/api/nft-db";
import Navbar from "../../components/Navbar";
import Profile from "./Profile";
import Profile404 from "./Profile404";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserNfts } from "../../redux/slices/user";
import { useLocation } from "react-router";

const ProfilePage = memo((props) => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const userNfts = useAppSelector(state => state.user.nfts);

    const profileAddress = useMemo(() => location.pathname.split("/")[1], [location.pathname]);

    const {
        data: userData,
        error: userError,
        isLoading: isUserLoading,
        refetch: userRefetch
    } = useGetUserQuery({ address: profileAddress }, {
        skip: !profileAddress,
    });

    const {
        data: userNftsData,
        error: userNftsError,
        isLoading: isUserNftsLoading,
        refetch: userNftsRefetch
    } = useGetUserNftsQuery({ address: profileAddress }, {
        skip: !profileAddress,
    });

    useEffect(() => {
        console.log(userNftsData);
        dispatch(setUserNfts(userNftsData?.userNfts));
    }, [userNftsData]);

    useEffect(() => {
        userNftsRefetch()
    }, [profileAddress]);

    return (
        <>
            <Navbar />
            {!isUserLoading && !userData && <Profile404 />}
            {!isUserLoading && userData &&
                <Profile
                    name={userData.name}
                    bio={userData.bio}
                    profileAddress={userData.address}
                    isFollowing={userData.isFollowing}
                    userRefetch={userRefetch}
                    userNfts={userNfts}
                    following={userData.following}
                />
            }
        </>
    );
});

export default ProfilePage;