import React, { memo, useEffect, useMemo } from "react";
import { useGetUserQuery } from "../../api/user";
import { useGetUserNftsQuery } from "../../api/nft";
import Profile from "./Profile";
import Profile404 from "./Profile404";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setUserNfts } from "../../redux/slices/user";
import { useLocation } from "react-router";
import { Helmet } from "react-helmet";
import { shortenAddress } from "../../lib/helpers";

const ProfilePage = memo(() => {
    const dispatch = useAppDispatch();
    const location = useLocation();
    const userNfts = useAppSelector(state => state.user.nfts);

    const profileAddress = useMemo(() => location.pathname.split("/")[1], [location.pathname]);

    const {
        data: userData,
        isLoading: isUserLoading,
        refetch: userRefetch
    } = useGetUserQuery({ address: profileAddress }, {
        skip: !profileAddress,
    });

    const {
        data: userNftsData,
        refetch: userNftsRefetch
    } = useGetUserNftsQuery({ address: profileAddress }, {
        skip: !profileAddress,
    });

    useEffect(() => {
        dispatch(setUserNfts(userNftsData));
    }, [dispatch, userNftsData]);

    useEffect(() => {
        userNftsRefetch();
    }, [profileAddress, userNftsRefetch]);

    return (
        <>
            <Helmet>
                <title>Own Me | {shortenAddress(profileAddress, 16) || "App"}</title>
            </Helmet>
            {!isUserLoading && !userData && <Profile404 />}
            {!isUserLoading && userData &&
                <Profile
                    profileImageUrl={userData.profileImageUrl}
                    bannerImageUrl={userData.bannerImageUrl}
                    name={userData.name}
                    bio={userData.bio}
                    link={userData.link}
                    profileAddress={userData.address}
                    isFollowing={userData.isFollowing}
                    userRefetch={userRefetch}
                    userNfts={userNfts}
                    following={userData.following}
                    adultVerified={userData.adultVerified}
                />
            }
        </>
    );
});

export default ProfilePage;