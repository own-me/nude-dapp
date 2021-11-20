import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { shortenAddress } from "../../lib/helpers";
import { useGetNftQuery, usePostNftLikeMutation } from "../../redux/api/nft";
import { HeartOutlined, HeartFilled } from "@ant-design/icons";
import useWallet from "../../hooks/useWallet";

const NftPageContainer = styled.div`
    padding: 80px;
    display: flex;

    @media (max-width: 1200px) {
        padding: 40px;
        flex-direction: column;
        align-items: center;
    }
`;

const MainSection = styled.div`
    width: 50%;

    @media (max-width: 1200px) {
        width: 80%;
    }

    @media (max-width: 640px) {
        width: 100%;
    }
`;

const InfoSection = styled.div`
    width: 50%;
    padding: 0px 80px;
    display: flex;
    flex-direction: column;

    @media (max-width: 1200px) {
        width: 80%;
    }

    @media (max-width: 640px) {
        width: 100%;
        padding: 0;
    }
`;

const NftImage = styled.img`
    width: 75vh;
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const NftTitle = styled.div`
    font-family: Poppins, Open Sans;
    font-size: 50px;
    padding: 20px 0px;

    @media (max-width: 640px) {
        font-size: 30px;
        text-align: center;
        padding: 10px 0px;
    }
`;

const NftStatsRow = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`;

const NftRarityContainer = styled.div`
    font-family: Poppins, Open Sans;
    display: flex;
    align-items: center;
    font-weight: 600;
`;

const NftPriceContainer = styled.div`
    font-family: Poppins, Open Sans;
    display: flex;
    align-items: center;
    font-weight: 600;
`;

const NftPriceValue = styled.div`
    font-size: 40px;
    color: #D842FE;
`;

const NftPriceTicker = styled.div`
    font-size: 30px;
    padding-left: 10px;
`;

const TopItems = styled.div`
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding-bottom: 40px;

    @media (max-width: 640px) {
        padding-bottom: 30px;
    }
`;

const TopItem = styled.div`
    font-family: Poppins, Open Sans;
`;

const TopItemHeader = styled.div`
    font-size: 40px;

    @media (max-width: 640px) {
        font-size: 20px;
    }
`;

const TopItemValue = styled.div`
    font-size: 30px;
    color: #D842FE;

    a {
        text-decoration: none;
        color: #D842FE;
    }

    :hover {
        a {
            color: #bb00eb;
            text-decoration: underline;
        }
    }

    @media (max-width: 640px) {
        font-size: 16px;
    }
`;

const InfoDescriptionHeader = styled.div`
    font-family: Poppins, Open Sans;
    font-size: 30px;

    @media (max-width: 640px) {
        font-size: 25px;
    }
`;

const InfoDescriptionText = styled.div`
    font-family: Poppins, Open Sans;
    font-size: 20px;
    padding-bottom: 40px;

    @media (max-width: 640px) {
        font-size: 16px;
    }
`;

const OwnMeButton = styled.button`
    font-family: Poppins, Open Sans;
    font-size: 22px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    cursor: pointer;
    width: 100%;
    align-self: flex-end;

    :hover {
        background-color: #fb5de1;
    }
`;

const LikeIconEmpty = styled(HeartOutlined)`
    cursor: pointer;
`;

const LikeIconFilled = styled(HeartFilled)`
    cursor: pointer;
`;

const NftPage = memo(() => {
    const params = useParams();
    const [tokenUriData, setTokenUriData] = useState(null);
    const [isLikeHovering, setIsLikeHovering] = useState(false);
    const { address } = useWallet();

    const [postNftLike] = usePostNftLikeMutation();

    const {
        data: nftData
    } = useGetNftQuery({ tokenId: params.tokenId }, {
        skip: !params.tokenId,
    });

    useEffect(() => {
        if (nftData) {
            setTokenUriData(nftData.nft.tokenURI);
        }
    }, [nftData]);

    const handleLikeClick = () => {
        if (!nftData?.isLiked) {
            postNftLike({ fromAddress: address, tokenId: params.tokenId });
        }
    };

    return (
        <NftPageContainer>
            <MainSection>
                <NftImage src={tokenUriData?.image || "https://via.placeholder.com/300x300"} />
                <NftTitle>{tokenUriData?.title || "-"}</NftTitle>
                <NftStatsRow>
                    <NftPriceContainer>
                        <NftPriceValue>{tokenUriData?.price || "69.0"}</NftPriceValue>
                        <NftPriceTicker>{"ETH"}</NftPriceTicker>
                    </NftPriceContainer>
                    <NftRarityContainer>
                        <NftPriceValue>{tokenUriData?.price || "3 / 12"}</NftPriceValue>
                        <NftPriceTicker>{"Rarity"}</NftPriceTicker>
                    </NftRarityContainer>
                </NftStatsRow>
            </MainSection>
            <InfoSection>
                <TopItems>
                    <TopItem>
                        <TopItemHeader>Owner</TopItemHeader>
                        <TopItemValue>
                            <Link to={`/${nftData?.nft.recipient}`}>
                                {nftData?.ownerName || shortenAddress(nftData?.nft.recipient, 12)}
                            </Link>
                        </TopItemValue>
                    </TopItem>
                    <TopItem>
                        <TopItemHeader>Views</TopItemHeader>
                        <TopItemValue>57235</TopItemValue>
                    </TopItem>
                    <TopItem>
                        <TopItemHeader>Likes</TopItemHeader>
                        <TopItemValue>
                            5345 {nftData?.isLiked || isLikeHovering ? 
                                <LikeIconFilled onMouseLeave={() => setIsLikeHovering(false)} onClick={handleLikeClick} /> : 
                                <LikeIconEmpty onMouseEnter={() => setIsLikeHovering(true)} onClick={handleLikeClick} />
                            }
                        </TopItemValue>
                    </TopItem>
                </TopItems>
                <InfoDescriptionHeader>Description</InfoDescriptionHeader>
                <InfoDescriptionText>{tokenUriData?.description || "-"}</InfoDescriptionText>
                <OwnMeButton>Own Me (69.123 ETH)</OwnMeButton>
            </InfoSection>
        </NftPageContainer>
    );
});

export default NftPage;