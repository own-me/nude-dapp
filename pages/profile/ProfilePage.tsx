import React, { useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { useAppDispatch } from "../../redux/hooks";
import { useGetUserQuery } from "../../redux/api/user";
import Navbar from "../../components/Navbar";
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
import catNft from "../../media/defaults/catnft.png";
import Modal from "../../components/Modal";
import EditProfileForm from "./EditProfileForm";

const ProfilePageContainer = styled.div`
    min-height: 100%;
    width: 50%;
    margin: 0 auto;
    background-color: white;

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
`;

const ProfileName = styled.h1`
    font-family: "Poppins", sans-serif;
    color: #1B1B1B;
    font-size: 36px;
    text-align: center;
    margin-top: 80px;
`;

const ProfileDescription = styled.p`
    font-family: "Poppins", sans-serif;
    color: #1B1B1B;
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

const SocialHandle = styled.a`
    font-family: Poppins, Open Sans;
    color: #1B1B1B;
    text-decoration: none;
    padding: 0 10px;
`;

const ActionButtons = styled.div`
    display: flex;
    justify-content: center;
`;

const ActionButton = styled.button`
    font-family: Poppins, Open Sans;
    font-size: 16px;
    background-color: #FF81EB;
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
    background-color: blue;
    float: left;
    margin-left: 20px;
`;

export default function ProfilePage() {
    const dispatch = useAppDispatch();
    const { address } = useWallet();
    const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

    const {
        data: userData,
        error: userError,
        isLoading: IsUserLoading
    } = useGetUserQuery({ name: window.location.pathname.split("/")[1] });

    useEffect(() => {
        console.log(userData);
    }, [userData]);

    const formattedAddress = useMemo(() => shortenAddress(address, 16), [address]);

    const mockSocials = [
        "https://www.instagram.com/christopher.trimboli/",
        "https://www.linkedin.com/in/christophertrimboli/"
    ];

    const supportedSocials = [
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
    ];

    const mockNFTCards = () => {
        const cards = []
        for (let i = 0; i < 12; i++) {
            cards.push(<NFTCard title={"King Tobi"} owner={"@thecatdad"} price={"2.45 ETH"} rarity={[1, 8]} image={catNft} key={i} />);
        }
        return cards;
    }

    return (
        <>
            <Navbar />
            <ProfilePageContainer>
                <ProfileBannerImage src={defaultBanner} />
                <ProfileImage src={defaultProfile} />
                <EditProfileButton onClick={() => setIsEditProfileOpen(true)}>Edit Profile</EditProfileButton>
                <ProfileAddress>{formattedAddress}</ProfileAddress>
                <ProfileName>{userData?.name}</ProfileName>
                <ProfileDescription>Software Engineer | Tobi’s Dad | Own Me Founder</ProfileDescription>
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
                                <SocialHandle href={url} target="_blank">
                                    {handle || url}
                                </SocialHandle>
                            </SocialHandleContainer>;
                        })
                    }
                </SocialHandles>
                <ActionButtons>
                    <ActionButton>Follow</ActionButton>
                    <ActionButton>Subscribe</ActionButton>
                </ActionButtons>
                <br />
                <Tabs tabs={["NFTs", "Posts", "Following", "Activity"]}>
                    <TabContent>
                        <NftCards>
                            {
                                mockNFTCards().map((card) => card)
                            }
                        </NftCards>
                    </TabContent>
                    <TabContent>
                        <h1>Posts bro</h1>
                    </TabContent>
                    <TabContent>
                        <h1>Following bro</h1>
                    </TabContent>
                    <TabContent>
                        <h1>Activity bro</h1>
                    </TabContent>
                </Tabs>
                <Modal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)}>
                    <EditProfileForm bannerImage={defaultBanner} profileImage={defaultProfile} onCancel={() => setIsEditProfileOpen(false)} />
                </Modal>
            </ProfilePageContainer>
        </>
    );
};