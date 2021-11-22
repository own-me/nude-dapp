import React, { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import defaultBanner from "../../media/defaults/stars-banner.png";
import defaultProfile from "../../media/defaults/missing-profile.png";
import useWallet from "../../hooks/useWallet";
import { shortenAddress } from "../../lib/helpers";
import twitterIcon from "../../media/icons/socials/color/twitter.svg";
import instagramIcon from "../../media/icons/socials/color/instagram.svg";
import linkedinIcon from "../../media/icons/socials/color/linkedin.svg";
import youtubeIcon from "../../media/icons/socials/color/youtube.svg";
import Tabs, { TabContent } from "../../components/Tabs";
import NFTCard from "../../components/NFTCard";
import Modal from "../../components/Modal";
import EditProfileForm from "./EditProfileForm";
import { Following, usePostFollowMutation } from "../../redux/api/follow";
import { usePostUnfollowMutation } from "../../redux/api/unfollow";
import FollowerList from "./FollowerList";
import { NftInterface } from "../../redux/api/nft";
import { useAppSelector } from "../../redux/hooks";

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
    text-align: center;
    margin-top: 80px;
`;

const ProfileDescription = styled.p`
    font-family: "Poppins", sans-serif;
    font-size: 20px;
    text-align: center;
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

const SocialHandles = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`;

const SocialHandleContainer = styled.div`
    display: flex;
    align-items: center;
    margin: 10px;
`;

const SocialIcon = styled.img`
    width: 30px;
    height: 30px;
`;

const SocialHandle = styled.a<{ $isDarkMode: boolean }>`
    font-family: Poppins, Open Sans;
    text-decoration: none;
    padding: 0 10px;
    color: ${props => props.$isDarkMode ? props.theme.dark.textColor : props.theme.light.textColor};
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
    background-color: #1212ff;
    float: left;
    margin-left: 20px;
    cursor: pointer;

    :hover {
        background-color: #b005ff;
    }
`;

interface ProfileProps{
    profileAddress: string;
    name: string;
    bio: string;
    isFollowing: boolean;
    userNfts: NftInterface[];
    following: Following[];
    profileImageUrl: string;
    bannerImageUrl: string;
    userRefetch: () => void;
}

const Profile = memo(({ profileAddress, name, bio, isFollowing, userNfts, following, profileImageUrl, bannerImageUrl, userRefetch}: ProfileProps) => {
    const { address } = useWallet();
    const [isEditProfileOpen, setIsEditProfileOpen] = useState<boolean>(false);

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

    const mockSocials = [
        "https://www.instagram.com/christopher.trimboli/",
        "https://www.linkedin.com/in/christophertrimboli/"
    ];

    const supportedSocials = useMemo(() => [
        {
            name: "Instagram",
            icon: instagramIcon,
            domainRegex: /www\.instagram\.com/,
            getHandle: (url: string) => url.split("/")[3]
        },
        {
            name: "Twitter",
            icon: twitterIcon,
            domainRegex: /www\.twitter\.com/,
            getHandle: (url: string) => url.split("/")[3]
        },
        {
            name: "Linkedin",
            icon: linkedinIcon,
            domainRegex: /www\.linkedin\.com/,
            getHandle: (url: string) => url.split("/")[4]
        },
        {
            name: "Youtube",
            icon: youtubeIcon,
            domainRegex: /www\.youtube\.com/,
            getHandle: (url: string) => url.split("/")[4]
        }
    ], []);

    const parseRawNfts = (nfts: NftInterface[]): NftInterface[] => {
        return nfts.map((nft: NftInterface) => {
            return {
                title: nft.tokenURI.title,
                description: nft.tokenURI.description,
                owner: nft.recipient,
                price: `${nft.price} ETH`,
                rarity: [1, 8],
                image: nft.tokenURI.image,
                tokenId: nft.tokenId,
                transactionHash: nft.transactionHash
            };
        });
    };

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
            <EditProfileButton onClick={() => setIsEditProfileOpen(true)}>Edit Profile</EditProfileButton>
            <a href={`https://ropsten.etherscan.io/address/${address}`} target="_blank"><ProfileAddress>{formattedAddress}</ProfileAddress></a>
            <ProfileName>{name}</ProfileName>
            <ProfileDescription>{bio}</ProfileDescription>
            <SocialHandles>
                {
                    mockSocials.map((url, index) => {
                        let handle = "";
                        let icon = "";
                        supportedSocials.forEach((social) => {
                            if (social.domainRegex.test(url)) {
                                handle = social.getHandle(url);
                                icon = social.icon;
                            }
                        });
                        return <SocialHandleContainer key={index}>
                            {icon && <SocialIcon src={icon} />}
                            <SocialHandle href={url} target="_blank" $isDarkMode={isDarkMode}>
                                {handle || url}
                            </SocialHandle>
                        </SocialHandleContainer>;
                    })
                }
            </SocialHandles>
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
                            userNfts?.length > 0 && parseRawNfts(userNfts).map((nft: NftInterface, index: number) => {
                                return <NFTCard
                                    tokenId={nft.tokenId}
                                    title={nft.title}
                                    owner={nft.owner}
                                    price={nft.price}
                                    rarity={nft.rarity}
                                    image={nft.image}
                                    key={index}
                                />;
                            })
                        }
                    </NftCards>
                </TabContent>
                <TabContent>
                    <h1>Posts bro</h1>
                </TabContent>
                <TabContent>
                    <FollowerList followers={following} />
                </TabContent>
                <TabContent>
                    <h1>Activity bro</h1>
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
                    userRefetch={userRefetch}
                />
            </Modal>
        </ProfileContainer>
    );
});

export default Profile;