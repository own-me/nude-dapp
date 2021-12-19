import React, { memo, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { shortenAddress } from "../../lib/helpers";
import { useGetNftQuery, usePostNftLikeMutation } from "../../redux/api/nft";
import { HeartOutlined, HeartFilled, EyeOutlined } from "@ant-design/icons";
import useWallet from "../../hooks/useWallet";
import { BigNumber, ethers } from "ethers";
import { Helmet } from "react-helmet";

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
    text-align: center;

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
    height: 100%;
    max-height: 80vh;
    width: auto;
    max-width: 100%;
    border-radius: 10px;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
`;

const NftTitle = styled.div`
    font-family: Poppins, Open Sans;
    font-size: 50px;
    font-weight: 600;

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

const NftPriceContainer = styled.div`
    font-family: Poppins, Open Sans;
    display: flex;
    align-items: center;
    font-weight: 600;
`;

const NftPriceValue = styled.div`
    font-size: 38px;
    color: #D842FE;
`;

const NftPriceTicker = styled.div`
    font-size: 25px;
    padding-left: 10px;
`;

const TopItems = styled.div`
    display: flex;
    justify-content: space-between;
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
    font-size: 35px;

    @media (max-width: 640px) {
        font-size: 20px;
    }
`;

const TopItemValue = styled.div`
    font-size: 25px;
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
    font-size: 32px;
    margin-top: 40px;

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
    font-size: 30px;
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
            <Helmet>
                <title>Own Me | {`NFT - ${tokenUriData?.title}`}</title>
            </Helmet>
            <MainSection>
                <NftImage src={tokenUriData?.image || "https://via.placeholder.com/300x300"} />
            </MainSection>
            <InfoSection>
                <NftTitle>{tokenUriData?.title || "-"}</NftTitle>
                <NftStatsRow>
                    <NftPriceContainer>
                        <NftPriceValue>{nftData?.nft?.price ? ethers.utils.formatEther(BigNumber.from(nftData?.nft?.price)) : 0}</NftPriceValue>
                        <NftPriceTicker>NUDE</NftPriceTicker>
                    </NftPriceContainer>
                </NftStatsRow>
                <InfoDescriptionHeader>Description</InfoDescriptionHeader>
                <InfoDescriptionText>{tokenUriData?.description || "-"}</InfoDescriptionText>
                <TopItems>
                    <TopItem>
                        <TopItemHeader>Creator</TopItemHeader>
                        <TopItemValue>
                            <Link to={`/${nftData?.nft.recipient}`}>
                                {nftData?.ownerName || shortenAddress(nftData?.nft.recipient, 12)}
                            </Link>
                        </TopItemValue>
                    </TopItem>
                    <TopItem>
                        <TopItemHeader>Views</TopItemHeader>
                        <TopItemValue>{nftData?.viewsCount} <EyeOutlined /></TopItemValue>
                    </TopItem>
                    <TopItem>
                        <TopItemHeader>Likes</TopItemHeader>
                        <TopItemValue>
                            {nftData?.likesCount} {nftData?.isLiked || isLikeHovering ?
                                <LikeIconFilled onMouseLeave={() => setIsLikeHovering(false)} onClick={handleLikeClick} /> :
                                <LikeIconEmpty onMouseEnter={() => setIsLikeHovering(true)} onClick={handleLikeClick} />
                            }
                        </TopItemValue>
                    </TopItem>
                </TopItems>
                <OwnMeButton>Own Me ({nftData?.nft?.price ? ethers.utils.formatEther(BigNumber.from(nftData?.nft?.price)) : 0} NUDE)</OwnMeButton>
            </InfoSection>
        </NftPageContainer>
    );
});

export default NftPage;