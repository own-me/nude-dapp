import React, { memo } from "react";
import styled from "styled-components";
import { Follower } from "../../redux/api/follow";
import defaultProfile from "../../media/defaults/missing-profile.png";
import { shortenAddress } from "../../lib/helpers";

interface FollowListProps {
    followers?: Follower[];
}

const FollowerListContainer = styled.div`
    display: flex;
`;

const FollowerListRow = styled.div`
    width: 100%;
    display: flex;
    padding: 20px 40px;
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
    font-family: Poppins, Open Sans;
`;

const FollowerInfoName = styled.div`

`;

const FollowerStatsContainer = styled.div`

`;

const FollowerList = memo(({ followers = [] }: FollowListProps) => {
    return (
        <FollowerListContainer>
            {
                followers.map((follower: Follower, index) =>
                    <FollowerListRow key={index}>
                        <FollowerProfileImage src={defaultProfile} />
                        <FollowerInfoContainer>
                            <FollowerInfoAddress>{shortenAddress(follower.fromAddress, 16)}</FollowerInfoAddress>
                        </FollowerInfoContainer>
                        <FollowerStatsContainer>

                        </FollowerStatsContainer>
                    </FollowerListRow>
                )
            }
        </FollowerListContainer>
    );
});

export default FollowerList;