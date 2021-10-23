import React, { memo } from "react";
import styled from "styled-components";
import { Follower } from "../../redux/api/follow";

interface FollowListProps {
    followers?: Follower[];
}

const FollowerListContainer = styled.div`
    display: flex;
`;

const FollowerListRow = styled.div`

`;

const FollowerProfileImage = styled.img`

`;

const FollowerInfoContainer = styled.div`

`;

const FollowerInfoAddress = styled.div`

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
                        <FollowerProfileImage src="" />
                        <FollowerInfoContainer>
                            <FollowerInfoAddress>{follower.fromAddress}</FollowerInfoAddress>
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