import React, { memo } from "react";
import styled from "styled-components";

interface NFTCardProps {
    title: string;
    owner: string;
    price: string;
    rarity: [number, number];
    image: string;
}

const NFTCardContainer = styled.div`
    font-family: Poppins, Open Sans;
    height: 280px;
    width: 200px;
    border: 1px solid #D8CBFF;
    border-radius: 10px;
    margin: 15px;
    text-align: center;
    padding: 20px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    position: relative;
    cursor: pointer;
    transition: all 0.3s ease;

    :hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
    }
`;

const NFTCardImage = styled.img`
    width: 100%;
`;

const NFTCardTitle = styled.div`
    text-align: left;
    font-weight: 600;
    margin-top: 10px;
`;

const NFTCardOwner = styled.div`
    text-align: left;
    color: #595959;
    font-size: 12px;
`;

const NFTCardPrice = styled.div`
    position: absolute;
    bottom: 10px;
    font-weight: 600;
`;

const NFTCardRarity = styled.div`
    position: absolute;
    bottom: 10px;
    right: 20px;
    color: #595959;
`;

const NFTCard = memo(({ title, owner, price, rarity, image }: NFTCardProps) => {
    return (
        <NFTCardContainer>
            <NFTCardImage src={image} />
            <NFTCardTitle>{title}</NFTCardTitle>
            <NFTCardOwner>{owner}</NFTCardOwner>
            <NFTCardPrice>{price}</NFTCardPrice>
            <NFTCardRarity>{`${rarity[0]} / ${rarity[1]}`}</NFTCardRarity>
        </NFTCardContainer>
    );
});

export default NFTCard;