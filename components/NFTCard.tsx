import { BigNumber, ethers } from "ethers";
import React, { memo } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { shortenAddress } from "../lib/helpers";
import { useAppSelector } from "../redux/hooks";

const NFTCardContainer = styled(Link)<{ $isDarkMode: boolean }>`
    font-family: Poppins, Open Sans;
    height: 375px;
    width: 290px;
    border: 1px solid #D8CBFF;
    border-radius: 10px;
    margin: 15px;
    text-align: center;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;
    text-decoration: none;
    color: ${props => (props.$isDarkMode ? "white" : "black")};
    background: ${props => (props.$isDarkMode ? "#0d0018" : "white")};

    :hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
`;

const NFTCardImage = styled.img`
    width: 100%;
    max-height: 70%;
    object-fit: cover;
    border-radius: 10px 10px 0 0;
`;

const NFTCardTitle = styled.div`
    text-align: left;
    font-weight: 600;
`;

const NFTCardOwner = styled.div<{ $isDarkMode: boolean }>`
    text-align: left;
    color: ${props => (props.$isDarkMode ? "#a9a9a9" : "#595959")};
    font-size: 12px;
`;

const NFTCardPrice = styled.div`
    position: absolute;
    bottom: 10px;
    font-weight: 600;
`;

const NFTCardContent = styled.div`
    padding: 20px;
`;

interface NFTCardProps {
    tokenId?: string;
    title: string;
    owner: string;
    price: string;
    rarity: [number, number];
    image: string;
}

const NFTCard = memo(({ tokenId, title, owner, price, image }: NFTCardProps) => {
    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    return (
        <NFTCardContainer to={`/nft/${tokenId}`} $isDarkMode={isDarkMode}>
            <NFTCardImage src={image} />
            <NFTCardContent>
                <NFTCardTitle>{title}</NFTCardTitle>
                <NFTCardOwner $isDarkMode={isDarkMode}>{shortenAddress(owner, 18)}</NFTCardOwner>
                <NFTCardPrice>{price ? ethers.utils.formatEther(BigNumber.from(price)) : 0} NUDE</NFTCardPrice>
            </NFTCardContent>
        </NFTCardContainer>
    );
});

export default NFTCard;