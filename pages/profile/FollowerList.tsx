import React, { memo, useCallback } from "react";
import styled from "styled-components";
import { Follower } from "../../redux/api/follow";
import defaultProfile from "../../media/defaults/missing-profile.png";
import { shortenAddress } from "../../lib/helpers";
import { usePostFollowMutation } from "../../redux/api/follow";
import { usePostUnfollowMutation } from "../../redux/api/unfollow";
import nftStatsIcon from "../../media/card.png";
import followerStatsIcon from "../../media/user.png";
import useWallet from "../../hooks/useWallet";
import { Link } from "react-router-dom";

interface FollowListProps {
    followers?: Follower[];
}

const FollowerListContainer = styled.div`
    display: flex;
    flex-direction: column;
    font-family: Poppins, Open Sans;
`;

const FollowerListRow = styled(Link)`
    display: flex;
    padding: 20px 40px;
    border-bottom: 1px solid #ebebeb;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
    text-decoration: none;

    :hover {
        background-color: #fef9ff;
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
    padding: 20px 40px;
`;

const FollowerInfoAddress = styled.div`
    font-size: 18px;
`;

const FollowButton = styled.button`
    font-family: Poppins, Open Sans;
    font-size: 14px;
    background-color: #71A1FF;
    color: white;
    border: none;
    padding: 0px 15px;
    border-radius: 25px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    height: 25px;
    margin-left: 20px;
    cursor: pointer;

    :hover {
        background-color: #3e7fff;
    }
`;

const StatsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: flex-end;
    flex-grow: 2;
`;

const StatsIcon = styled.img`
    height: 20px;
    margin-right: 5px;
`;

const FollowerStats = styled.div`
    display: flex;
    align-items: center;
`;


const NftStats = styled.div`
    display: flex;
    align-items: center;
`;

const FollowerList = memo(({ followers = [] }: FollowListProps) => {
    const { address } = useWallet();

    const [postFollow, {
        isLoading: isPostFollowLoading,
        isSuccess: isPostFollowSuccess,
        isError: isPostFollowError,
        data: postFollowData,
        error: postFollowError
    }] = usePostFollowMutation();

    const [postUnfollow, {
        isLoading: isPostUnfollowLoading,
        isSuccess: isPostUnfollowSuccess,
        isError: isPostUnfollowError,
        data: postUnfollowData,
        error: postUnfollowError
    }] = usePostUnfollowMutation();

    const handleFollowButton = useCallback((follower: Follower) => {
        if (address === follower.fromAddress) {
            postUnfollow({ toAddress: follower.toAddress });
        } else {
            postFollow({ toAddress: follower.toAddress });
        }
    }, [address, postFollow, postUnfollow]);

    return (
        <FollowerListContainer>
            {
                followers.map((follower: Follower, index) =>
                    <FollowerListRow to={`/${follower.toAddress}`} key={index}>
                        <FollowerProfileImage src={follower.toProfileImageUrl || defaultProfile} />
                        <FollowerInfoContainer>
                            <FollowerInfoAddress>{shortenAddress(follower.toAddress, 16)}</FollowerInfoAddress>
                            <FollowButton onClick={() => handleFollowButton(follower)}>
                                {address === follower.fromAddress ? "Unfollow" : "Follow"}
                            </FollowButton>
                        </FollowerInfoContainer>
                        <StatsContainer>
                            <FollowerStats>
                                <StatsIcon src={followerStatsIcon} /> {123}
                            </FollowerStats>
                            <NftStats>
                                <StatsIcon src={nftStatsIcon} /> {12}
                            </NftStats>
                        </StatsContainer>
                    </FollowerListRow>
                )
            }
        </FollowerListContainer>
    );
});

export default FollowerList;