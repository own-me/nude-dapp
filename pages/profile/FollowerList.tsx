import React, { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { Following } from "../../redux/api/follow";
import defaultProfile from "../../media/defaults/missing-profile.png";
import { shortenAddress } from "../../lib/helpers";
import { usePostFollowMutation } from "../../redux/api/follow";
import { usePostUnfollowMutation } from "../../redux/api/unfollow";
import useWallet from "../../hooks/useWallet";
import { Link } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import { TeamOutlined, FileImageOutlined } from "@ant-design/icons";

interface FollowListProps {
    followers?: Following[];
}

const FollowerListContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Poppins, Open Sans;
`;

const FollowerListRow = styled(Link)<{ $isDarkMode: boolean }>`
    display: flex;
    padding: 20px 40px;
    border-bottom: 1px solid #ebebeb;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    text-decoration: none;
    color: ${props => props.$isDarkMode ? props.theme.dark.textColor : props.theme.light.textColor};

    :hover {
        background-color: ${props => props.$isDarkMode ? "#170030" : "#fef9ff"};
    }
`;

const FollowerProfileImage = styled.img`
    width: 125px;
    height: 125px;
    border-radius: 100%;
    border: 5px solid white;
    background: white;
    box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
`;

const FollowerInfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 10px 40px;
`;

const FollowerInfoName = styled.div`
    font-size: 25px;
`;

const FollowerInfoAddress = styled.div`
    font-size: 18px;
`;

const FollowButton = styled.button<{ $isFollowing: boolean }>`
    font-family: Poppins, Open Sans;
    font-size: 14px;
    background-color: #71A1FF;
    color: white;
    border: none;
    padding: 0px 15px;
    border-radius: 25px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    height: 25px;
    margin-top: 20px;
    cursor: pointer;

    :hover {
        background-color:  ${props => props.$isFollowing ? "#ff1f3d" : "#3e7fff"};
    }
`;

const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    flex-grow: 2;
`;

const Stats = styled.div`
    display: flex;
    align-items: center;
    font-size: 20px;

    .anticon {
        padding-right: 10px;
    }
`;

const FollowerList = memo(({ followers = [] }: FollowListProps) => {
    const { address } = useWallet();

    const [postFollow] = usePostFollowMutation();
    const [postUnfollow] = usePostUnfollowMutation();

    const [isFollowHovered, setIsFollowHovered] = useState<boolean>(false);

    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    const handleFollowButton = useCallback((follower: Following) => {
        if (address === follower.fromAddress) {
            postUnfollow({ toAddress: follower.toAddress });
        } else {
            postFollow({ toAddress: follower.toAddress });
        }
    }, [address, postFollow, postUnfollow]);

    return (
        <FollowerListContainer>
            {
                followers.map((follower: Following, index) =>
                    <FollowerListRow to={`/${follower.toAddress}`} key={index} $isDarkMode={isDarkMode}>
                        <FollowerProfileImage src={follower.toProfileImageUrl || defaultProfile} />
                        <FollowerInfoContainer>
                            <FollowerInfoName>{follower.name}</FollowerInfoName>
                            <FollowerInfoAddress>{shortenAddress(follower.toAddress, 16)}</FollowerInfoAddress>
                            {address === follower.fromAddress &&
                                <FollowButton 
                                    onClick={() => handleFollowButton(follower)}
                                    onMouseEnter={() =>setIsFollowHovered(true)}
                                    onMouseLeave={() =>setIsFollowHovered(false)}
                                    $isFollowing={address === follower.fromAddress}
                                >
                                    {isFollowHovered && address === follower.fromAddress ? "Unfollow" : 
                                        isFollowHovered && address !== follower.fromAddress ? "Follow" : "Following"
                                    }
                                </FollowButton>
                            }
                        </FollowerInfoContainer>
                        <StatsContainer>
                            <Stats>
                                <TeamOutlined /> {123}
                            </Stats>
                            <Stats>
                                <FileImageOutlined /> {12}
                            </Stats>
                        </StatsContainer>
                    </FollowerListRow>
                )
            }
        </FollowerListContainer>
    );
});

export default FollowerList;