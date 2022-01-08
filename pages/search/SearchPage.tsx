import React, { memo, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import NFTCard from "../../components/NFTCard";
import Tabs, { TabContent, Tab } from "../../components/Tabs";
import { NftInterface, useGetSearchNftsQuery } from "../../redux/api/nft";
import { useGetSearchPostsQuery } from "../../redux/api/posts";
import { useGetSearchUsersQuery } from "../../redux/api/user";
import { useAppSelector } from "../../redux/hooks";
import PostsList from "../posts/PostsList";
import FollowerList from "../profile/FollowerList";

const SearchPageContainer = styled.div`
    width: 100%;
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
    width: 50%;
    border-radius: 50px;
    border: 4px #DF83FF solid;
    margin-bottom: 30px;
    text-align: center;
    font-size: 25px;
    padding: 10px 20px;
    font-family: Poppins, Open Sans;
    background-color: ${props => props.$isDarkMode ? "#1c012a" : "#FFFDFF"};
    color: ${props => props.$isDarkMode ? "white" : "black"};
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
`;

const NftCards = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px 0px;
`;

const SearchPostsList = styled(PostsList)`
    width: 50%;
    margin: 0 auto;

    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const SearchUsersList = styled(FollowerList)`
    width: 50%;
    margin: 0 auto;

    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const SearchPage = memo(() => {
    const [searchValue, setSearchValue] = useState("*");
    const [activeTab, setActiveTab] = useState("");

    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    const {
        data: searchNftsData,
        refetch: searchNftsRefetch
    } = useGetSearchNftsQuery({ query: searchValue || "*" });

    const {
        data: searchPostsData,
        refetch: searchPostsRefetch
    } = useGetSearchPostsQuery({ query: searchValue || "*" });

    const {
        data: searchUsersData,
        refetch: searchUsersRefetch
    } = useGetSearchUsersQuery({ query: searchValue || "*" });

    useEffect(() => {
        if (activeTab === `NFTs (${searchNftsData?.nfts?.length || 0})`) {
            searchNftsRefetch();
        }
    }, [searchValue, searchNftsRefetch, activeTab, searchNftsData?.nfts?.length]);

    useEffect(() => {
        if (activeTab === `Posts (${searchPostsData?.posts?.length || 0})`) {
            searchPostsRefetch();
        }
    }, [searchValue, searchPostsRefetch, activeTab, searchPostsData?.posts?.length]);

    useEffect(() => {
        if (activeTab === `Users (${searchUsersData?.users?.length || 0})`) {
            searchUsersRefetch();
        }
    }, [searchValue, searchUsersRefetch, activeTab, searchUsersData?.users?.length]);

    return (
        <SearchPageContainer>
            <SearchBar 
                type="text" 
                placeholder="Search..." 
                $isDarkMode={isDarkMode} 
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <SearchTabs 
                tabs={useMemo(() => [
                    `NFTs (${searchNftsData?.nfts?.length || 0})`,
                    `Posts (${searchPostsData?.posts?.length || 0})`,
                    `Users (${searchUsersData?.users?.length || 0})`,
                    "Hashtags"
                ], [searchNftsData?.nfts?.length, searchPostsData?.posts?.length, searchUsersData?.users?.length])}
                onTabChange={(tab) => setActiveTab(tab)}
            >
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
                                    likesCount={nft.likesCount}
                                    viewsCount={nft.viewsCount}
                                    hashtags={nft.tokenURI.hashtags}
                                    key={index}
                                />;
                            })
                        }
                    </NftCards>
                </TabContent>
                <TabContent>
                    <SearchPostsList
                        posts={searchPostsData?.posts || []}
                        refreshPosts={searchPostsRefetch}
                    />
                </TabContent>
                <TabContent>
                    <SearchUsersList followers={searchUsersData?.users} />
                </TabContent>
                <TabContent>

                </TabContent>
            </SearchTabs>
        </SearchPageContainer>
    );
});

export default SearchPage;