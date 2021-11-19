import React from "react";
import styled from "styled-components";

const AuctionHousePageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default function AuctionHousePage() {
    return (
        <AuctionHousePageContainer>
            <h1>Auction House!</h1>
        </AuctionHousePageContainer>
    );
}