import React, { memo } from "react";
import { useParams } from "react-router";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

const NftPageContainer = styled.div`
    color: black;
    padding: 40px;
    display: flex;
`;

const MainSection = styled.div`
    width: 50%;
`;

const InfoSection = styled.div`
    width: 50%;
    padding: 40px;
    display: flex;
    flex-direction: column;
`;

const NftImage = styled.img`
    height: 75vh;
    max-width: 100%;
    border-radius: 10px;
`;

const NftTitle = styled.div`
    font-family: Poppins, Open Sans;
    font-size: 50px;
`;

const NftDescription = styled.div`
    font-family: Poppins, Open Sans;
    font-size: 30px;
`;

const TopItems = styled.div`
    display: flex;
    justify-content: space-around;
    text-align: center;
    padding-bottom: 40px;
`;

const TopItem = styled.div`
    font-family: Poppins, Open Sans;
`;

const TopItemHeader = styled.div`
    font-size: 40px;
`;

const TopItemValue = styled.div`
    font-size: 30px;
    color: #D842FE;
`;

const InfoDescriptionHeader = styled.div`
    font-family: Poppins, Open Sans;
    font-size: 30px;
`;

const InfoDescriptionText = styled.div`
    font-family: Poppins, Open Sans;
    font-size: 20px;
    padding-bottom: 40px;
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

interface NftPageProps {
    image: string;
    title: string;
    description: string;
}

const NftPage = memo((props: NftPageProps) => {
    const params = useParams();
    console.log(params);

    return (
        <>
            <Navbar />
            <NftPageContainer>
                <MainSection>
                    <NftImage src={props.image || "https://via.placeholder.com/300x300"} />
                    <NftTitle>{props.title || "-"}</NftTitle>
                    <NftDescription>{props.description || "-"}</NftDescription>
                </MainSection>
                <InfoSection>
                    <TopItems>
                        <TopItem>
                            <TopItemHeader>Creator</TopItemHeader>
                            <TopItemValue>Nicki Minaj</TopItemValue>
                        </TopItem>
                        <TopItem>
                            <TopItemHeader>Views</TopItemHeader>
                            <TopItemValue>57235</TopItemValue>
                        </TopItem>
                        <TopItem>
                            <TopItemHeader>Likes</TopItemHeader>
                            <TopItemValue>5345</TopItemValue>
                        </TopItem>
                    </TopItems>
                    <InfoDescriptionHeader>Description</InfoDescriptionHeader>
                    <InfoDescriptionText>What makes the pot sweeter, though, is how consistent she is at providing her fans with top-notch videos and photos, day in and day out. And oh how visually appealing this content creator is! Long story short, she’s basically the girl next door who’s decided to work on OnlyFans.</InfoDescriptionText>
                    <OwnMeButton>Own Me (69.123 ETH)</OwnMeButton>
                </InfoSection>
            </NftPageContainer>
        </>
    );
});

export default NftPage;