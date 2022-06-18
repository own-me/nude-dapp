import React, { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import defaultBanner from "../../media/defaults/stars-banner.png";
import defaultProfile from "../../media/defaults/missing-profile.png";
import useWallet from "../../hooks/useWallet";
import { shortenAddress } from "../../lib/helpers";
import Tabs, { TabContent } from "../../components/Tabs";
import NFTCard from "../../components/NFTCard";
import Modal from "../../components/Modal";
import EditProfileForm from "./EditProfileForm";
import { usePostUnfollowMutation, usePostFollowMutation, Following } from "../../api/user";
import { NftInterface } from "../../api/nft";
import { useAppSelector } from "../../redux/hooks";
import ProfilePosts from "../posts/ProfilePosts";
import ProfileCardList from "./ProfileCardList";
import VerifyStepper from "../../components/VerifyStepper";

const ProfileContainer = styled.div<{ $isDarkMode: boolean }>`
    min-height: 100%;
    width: 100%;
    margin: 0 auto;
    background-color: white;
    transition: width 0.5s ease-in-out;
    background-color: ${props => props.$isDarkMode ? props.theme.dark.backgroundColor2 : props.theme.light.backgroundColor};
    color: ${props => props.$isDarkMode ? props.theme.dark.textColor : props.theme.light.textColor};
    transition: background 500ms ease-in, color 500ms ease-in;
`;

const ProfileFollowerList = styled(ProfileCardList)`
    width: 50%;
    margin: 0 auto;

    @media (max-width: 1200px) {
        width: 100%;
    }
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
    top: 100px;
    border-radius: 100%;
    border: 5px solid white;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const ProfileName = styled.h1`
    font-family: "Poppins", sans-serif;
    font-size: 36px;
    margin-top: 80px;
`;

const ProfileDescription = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: 20px;
`;

const ProfileLink = styled.a`
    font-family: "Poppins", sans-serif;
    font-size: 18px;
`;

const ProfileInfo = styled.div`
    text-align: center;
    padding-bottom: 20px;
`;

const ProfileAddress = styled.button`
    font-family: Poppins, Open Sans;
    font-size: 16px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 25px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    margin: 20px 20px 0 0;
    float: right;
    cursor: pointer;
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: center;
`;

function getFollowButtonHoverColor(isFollowing: boolean, isHovered: boolean) {
    if (isFollowing) {
        return isHovered ? "#ff1f3d" : "#71A1FF";
    }
    return "#FF81EB";
}

const ActionButton = styled.button<{ $isFollowing?: boolean, $isHovered?: boolean }>`
    font-family: Poppins, Open Sans;
    font-size: 16px;
    background-color: ${props => getFollowButtonHoverColor(props.$isFollowing, props.$isHovered)};
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 25px;
    margin: 10px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    cursor: pointer;
`;

const NftCards = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px 0px;
`;

const EditProfileButton = styled(ProfileAddress)`
    background-color: #8336ff;
    float: left;
    margin-left: 20px;
    cursor: pointer;

    :hover {
        background-color: #5f23ff;
    }
`;

const GetVerifiedButton = styled(ProfileAddress)`
    background-color: #8336ff;
    float: right;
    cursor: pointer;

    :hover {
        background-color: #5f23ff;
    }
`;

const NoItemsMessage = styled.div`
    display: flex;
    justify-content: center;
    padding: 75px 20px;
    font-family: "Poppins", sans-serif;
`;

interface ProfileProps {
    profileAddress: string;
    name: string;
    bio: string;
    link: string;
    isFollowing: boolean;
    userNfts: NftInterface[];
    following: Following[];
    profileImageUrl: string;
    bannerImageUrl: string;
    userRefetch: () => void;
}

const Profile = memo(({
    profileAddress,
    name,
    bio,
    link,
    isFollowing,
    userNfts,
    following,
    profileImageUrl,
    bannerImageUrl,
    userRefetch
}: ProfileProps) => {
    const { address } = useWallet();
    const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);
    const [isVerifyOpen, setIsVerifyOpen] = useState<boolean>(false);

    const formattedAddress = useMemo(() => shortenAddress(profileAddress, 16), [profileAddress]);
    const [isFollowButtonHovered, setIsFollowButtonHovered] = useState(false);

    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    const [postFollow, {
        isSuccess: isPostFollowSuccess,
    }] = usePostFollowMutation();

    const [postUnfollow, {
        isSuccess: isPostUnfollowSuccess,
    }] = usePostUnfollowMutation();

    useEffect(() => {
        userRefetch();
    }, [userRefetch, isPostFollowSuccess, isPostUnfollowSuccess,]);

    const followButtonText = useMemo(() => {
        if (isFollowing) {
            return isFollowButtonHovered ? "Unfollow" : "Following";
        }
        return "Follow";
    }, [isFollowing, isFollowButtonHovered]);

    return (
        <ProfileContainer $isDarkMode={isDarkMode}>
            <ProfileBannerImage src={bannerImageUrl || defaultBanner} />
            <ProfileImage src={profileImageUrl || defaultProfile} />
            {
                address === profileAddress &&
                <EditProfileButton onClick={() => setIsEditProfileOpen(true)}>
                    Edit Profile
                </EditProfileButton>
            }
            <a href={`https://mumbai.polygonscan.com/address/${profileAddress}`} target="_blank">
                <ProfileAddress>{formattedAddress}</ProfileAddress>
            </a>
            {
                address === profileAddress &&
                <GetVerifiedButton onClick={() => setIsVerifyOpen(true)}>
                    Get Verified
                </GetVerifiedButton>
            }
            <ProfileInfo>
                <ProfileName>{name}</ProfileName>
                <ProfileDescription>{bio}</ProfileDescription>
                <ProfileLink href={link} target={"_blank"}>{link}</ProfileLink>
            </ProfileInfo>
            {
                profileAddress !== address &&
                <ActionButtons>
                    <ActionButton
                        onClick={() => isFollowing ? postUnfollow({ toAddress: profileAddress }) : postFollow({ toAddress: profileAddress })}
                        $isFollowing={isFollowing}
                        $isHovered={isFollowButtonHovered}
                        onMouseEnter={() => setIsFollowButtonHovered(true)}
                        onMouseOut={() => setIsFollowButtonHovered(false)}
                    >
                        {followButtonText}
                    </ActionButton>
                    <ActionButton>Subscribe</ActionButton>
                </ActionButtons>
            }
            <br />
            <Tabs tabs={useMemo(() => [
                `NFTs (${userNfts?.length || 0})`,
                "Posts (0)",
                `Following (${following?.length || 0})`,
                "Activity"
            ], [userNfts, following])}>
                <TabContent>
                    <NftCards>
                        {
                            userNfts?.length > 0 ? userNfts.map((nft: NftInterface, index: number) => {
                                return <NFTCard
                                    tokenId={nft.tokenId}
                                    title={nft.tokenURI.title}
                                    recipient={nft.recipient}
                                    price={nft.price}
                                    image={nft.tokenURI.image}
                                    likesCount={nft._count.nft_mumbai_likes}
                                    viewsCount={nft._count.nft_mumbai_views}
                                    hashtags={nft.tokenURI.hashtags || []}
                                    transactionHash={nft.transactionHash}
                                    key={index}
                                    onReport={() => console.log("report")}
                                />;
                            }) : <NoItemsMessage>No NFTs yet...</NoItemsMessage>
                        }
                    </NftCards>
                </TabContent>
                <TabContent>
                    <ProfilePosts profileImageUrl={profileImageUrl} profileAddress={profileAddress} userAddress={address} profileName={name} />
                </TabContent>
                <TabContent>
                    {
                        following?.length > 0 ? <ProfileFollowerList users={following} /> : <NoItemsMessage>Not following anyone yet...</NoItemsMessage>
                    }
                </TabContent>
                <TabContent>
                    <NoItemsMessage>No activity yet...</NoItemsMessage>
                </TabContent>
            </Tabs>
            <Modal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)}>
                <EditProfileForm
                    address={profileAddress}
                    bannerImageUrl={bannerImageUrl || defaultBanner}
                    profileImageUrl={profileImageUrl}
                    onCancel={() => setIsEditProfileOpen(false)}
                    currentName={name}
                    currentBio={bio}
                    currentLink={link}
                    userRefetch={userRefetch}
                />
            </Modal>
            {isVerifyOpen && <VerifyStepper userAddress={address} onClose={() => setIsVerifyOpen(false)} />}
        </ProfileContainer>
    );
});

export default Profile;