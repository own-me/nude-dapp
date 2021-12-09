import React, { memo, useEffect, useState } from "react";
import styled from "styled-components";
import NFTCard from "../../components/NFTCard";
import Tabs, { TabContent, Tab } from "../../components/Tabs";
import { useGetSearchNftsQuery } from "../../redux/api/nft";
import { useAppSelector } from "../../redux/hooks";

const SearchPageContainer = styled.div`
    width: 70%;
    margin: 0 auto;
    padding-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const SearchTabs = styled(Tabs)`
    ${Tab} {
        font-size: 20px;
    }
`;

const SearchBar = styled.input<{ $isDarkMode: boolean }>`
    width: 80%;
    border-radius: 50px;
    border: 4px #DF83FF solid;
    margin-bottom: 40px;
    text-align: center;
    font-size: 25px;
    padding: 20px;
    font-family: Poppins, Open Sans;
    background-color: ${props => props.$isDarkMode ? "#1c012a" : "#FFFDFF"};
    color: ${props => props.$isDarkMode ? "white" : "black"};
`;

const NftCards = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px 0px;
`;

const SearchPage = memo(() => {
    const [searchValue, setSearchValue] = useState("*");
    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    const {
        data: searchNftsData,
        refetch: searchNftsRefetch
    } = useGetSearchNftsQuery({ query: searchValue || "*" });

    useEffect(() => {
        searchNftsRefetch();
    }, [searchValue, searchNftsRefetch]);

    return (
        <SearchPageContainer>
            <SearchBar 
                type="text" 
                placeholder="Search..." 
                $isDarkMode={isDarkMode} 
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <SearchTabs tabs={[
                "NFTs",
                "Posts (0)",
                "Users",
                "Activity"
            ]}>
                <TabContent>
                    <NftCards>
                        {
                            searchNftsData?.nfts?.length > 0 && searchNftsData?.nfts?.map((nft: NftInterface, index: number) => {
                                return <NFTCard
                                    tokenId={nft.tokenId}
                                    title={nft.tokenURI.title}
                                    recipient={nft.recipient}
                                    price={nft.price}
                                    image={nft.tokenURI.image}
                                    key={index}
                                />;
                            })
                        }
                    </NftCards>
                </TabContent>
                <TabContent>

                </TabContent>
                <TabContent>

                </TabContent>
                <TabContent>

                </TabContent>
            </SearchTabs>
        </SearchPageContainer>
    );
});

export default SearchPage;