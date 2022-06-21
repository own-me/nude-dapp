import { BigNumber, ethers } from "ethers";
import React, { memo, useMemo } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import { shortenAddress } from "../lib/helpers";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { EyeOutlined, HeartOutlined } from "@ant-design/icons";
import EllipseExtras, { EllipseExtrasContainer, ExtraAction } from "./EllipseExtras";
import LazyImage, { Image, LazyImageContainer, LoadingImage } from "./LazyImage";
import { toggleReportModal } from "../redux/slices/app";
import { routes } from "../lib/routes";

const NFTCardContainer = styled(Link) <{ $isDarkMode: boolean, $isDummy: boolean }>`
    font-family: Poppins, Open Sans;
    height: 400px;
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

    ${props => !props.$isDummy && css`
        :hover {
            transform: translateY(-5px);
            box-shadow: 0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23);
        }

        ::after {
            content: "";
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            background: rgba(244, 246, 248, ${props => props.$isDarkMode ? 0.025 : 0.05});
            transition: background-color 100ms ease-out, opacity 100ms ease-out;
            opacity: 0;
        }

        :hover::after {
            opacity: 1;
        }
    `};
`;

const NFTCardImage = styled(LazyImage)`
    ${Image} {
        width: 100%;
        height: 62%;
        object-fit: cover;
        border-radius: 10px 10px 0 0;
    }

    ${LazyImageContainer} {
        width: 100%;
        height: 62%;
        border-radius: 10px 10px 0 0;
    }

    ${LoadingImage} {
        border-radius: 10px 10px 0 0;
        height: 62%;
    }
`;

const NFTCardTitle = styled.div`
    text-align: left;
    font-weight: 600;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    width: 100%;
`;

const NFTCardOwner = styled.div<{ $isDarkMode: boolean }>`
    text-align: left;
    color: ${props => (props.$isDarkMode ? "#a9a9a9" : "#595959")};
    font-size: 12px;
`;

const NFTCardPrice = styled.div`
    font-weight: 600;
`;

const PriceAmount = styled.span`
    padding-right: 5px;
    color: #E127FF;
`;

const PriceTokenName = styled.span`
    font-size: 14px;
`;

const NFTCardContent = styled.div`
    padding: 10px 15px;
`;

const NftStats = styled.div`
    display: flex;
    align-items: center;
    padding-top: 10px;
    font-size: 14px;
`;

const NftStatItem = styled.div`
    display: flex;
    align-items: center;
    padding-right: 15px;
`;

const LikeIconEmpty = styled(HeartOutlined)`
    cursor: pointer;
    padding-right: 5px;
`;

const ViewsIcon = styled(EyeOutlined)`
    cursor: pointer;
    padding-right: 5px;
`;

const NftHashTags = styled.div`
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    color: #138EFF;
    font-size: 12px;
    padding-top: 5px;
`;

const NftHashTag = styled.span`
    padding-right: 5px;
`;

const BottomItems = styled.div`
    display: flex;
    align-items: center;
    padding-right: 15px;
    justify-content: space-between;
    position: absolute;
    bottom: 5px;
    width: 92%;
`;

const ExtraActions = styled(EllipseExtras)`
    &${EllipseExtrasContainer} {
        z-index: 5;
    }
`;

interface NFTCardProps {
    tokenId?: number;
    title: string;
    recipient: string;
    price?: string;
    image: string;
    likesCount: number;
    viewsCount: number;
    hashtags: string[];
    transactionHash?: string;
    isDummy?: boolean;
    onReport: (tokenId: number) => void;
}

const NFTCard = memo(({
    tokenId,
    title,
    recipient,
    price,
    image,
    likesCount,
    viewsCount,
    hashtags = [],
    transactionHash,
    isDummy,
    onReport,
}: NFTCardProps) => {
    const dispatch = useAppDispatch();
    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    const extraActions: ExtraAction[] = useMemo(() => [
        {
            text: "Polyscan",
            link: `https://mumbai.polygonscan.com/tx/${transactionHash}`,
            onClick: (e) => e.stopPropagation()
        },
        {
            text: "Report",
            onClick: (e) => {
                e.stopPropagation();
                e.preventDefault();
                dispatch(toggleReportModal());
                onReport && onReport(tokenId);
            }
        }
    ], [dispatch, onReport, tokenId, transactionHash]);

    return (
        <NFTCardContainer
            to={isDummy ? routes.mint.path : `${routes.nft.path}/${tokenId}`}
            $isDarkMode={isDarkMode}
            $isDummy={isDummy}
        >
            <NFTCardImage src={image} />
            <NFTCardContent>
                <NFTCardTitle>{title}</NFTCardTitle>
                <NFTCardOwner $isDarkMode={isDarkMode}>{shortenAddress(recipient, 18)}</NFTCardOwner>
                <NftStats>
                    <NftStatItem>
                        <LikeIconEmpty /> {likesCount || 0}
                    </NftStatItem>
                    <NftStatItem>
                        <ViewsIcon /> {viewsCount || 0}
                    </NftStatItem>
                </NftStats>
                <NftHashTags>
                    {
                        typeof hashtags === "object" && hashtags.map((hashtag, index) => (
                            <NftHashTag key={index}>{hashtag}</NftHashTag>
                        ))
                    }
                </NftHashTags>
                <BottomItems>
                    <NFTCardPrice>
                        <PriceAmount>{price ? ethers.utils.formatEther(BigNumber.from(price)) : 0}</PriceAmount>
                        <PriceTokenName>NUDE</PriceTokenName>
                    </NFTCardPrice>
                    {!isDummy && <ExtraActions extraActions={extraActions} />}
                </BottomItems>
            </NFTCardContent>
        </NFTCardContainer>
    );
});

export default NFTCard;