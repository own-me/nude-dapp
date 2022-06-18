import { SearchOutlined } from "@ant-design/icons";
import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import HashtagWordCloud from "../../components/HashtagWordCloud";
import NFTCard from "../../components/NFTCard";
import Tabs, { TabContent, Tab } from "../../components/Tabs";
import { NftInterface, useGetSearchNftsQuery } from "../../api/nft";
import { useGetSearchPostsQuery } from "../../api/posts";
import { useGetSearchUsersQuery } from "../../api/user";
import { useAppSelector } from "../../redux/hooks";
import PostsList from "../posts/PostsList";
import ProfileCardList from "../profile/ProfileCardList";
import loadingSpinner from "../../media/own-me-spinner.svg";
import NftReportModal from "../../components/NftReportModal";

const SearchPageContainer = styled.div`
    width: 100%;
    height: 100%;
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
    height: 100%;

    ${Tab} {
        font-size: 20px;
    }

    ${TabContent} {
        height: 100%;
    }
`;

const SearchBarContainer = styled.div`
    position: relative;
    width: 50%;
`;

const SearchInput = styled.input<{ $isDarkMode: boolean }>`
    width: 100%;
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

const SearchIcon = styled(SearchOutlined)`
    position: absolute;
    top: 20px;
    right: 25px;
    font-size: 28px;
    color: #ff86df;
`;

const NftCards = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    padding: 20px 0px;
`;

const SearchPostsList = styled(PostsList)`
    width: 40%;
    min-width: 800px;
    max-width: 1200px;
    margin: 0 auto;

    @media (max-width: 1200px) {
        width: 90%;
    }
`;

const SearchProfilesList = styled(ProfileCardList)`
    width: 100%;
    margin: 0 auto;

    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const PaginationMessage = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px;
`;

const NoItemsMessage = styled.div`
    font-family: "Poppins", sans-serif;
`;

enum TabOptions {
    NFTS = "NFTs",
    POSTS = "Posts",
    USERS = "Users",
    HASHTAGS = "Hashtags"
}

const SearchPage = memo(() => {
    const [searchValue, setSearchValue] = useState<string>("*");
    const [activeTab, setActiveTab] = useState<TabOptions>(TabOptions.NFTS);
    const [pageNumber, setPageNumber] = useState<number>(0);
    const [pageMaxed, setPageMaxed] = useState<boolean>(false);
    const [nfts, setNfts] = useState<NftInterface[]>([]);
    const [reportingNft, setReportingNft] = useState<NftInterface | null>(null);

    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    const {
        data: searchNftsData,
        isLoading: isSearchNftsLoading,
    } = useGetSearchNftsQuery({ query: searchValue || "*", page: pageNumber }, {
        skip: pageMaxed && activeTab !== TabOptions.NFTS,
    });

    const {
        data: searchPostsData,
        refetch: searchPostsRefetch
    } = useGetSearchPostsQuery({ query: searchValue || "*" }, {
        skip: activeTab !== TabOptions.POSTS,
    });

    const {
        data: searchUsersData
    } = useGetSearchUsersQuery({ query: searchValue || "*" }, {
        skip: activeTab !== TabOptions.USERS,
    });

    useEffect(() => {
        if (searchNftsData?.nfts?.length > 0) {
            if (searchValue) {
                setNfts(searchNftsData.nfts);
            } else {
                setNfts((prevValue) => prevValue.concat(searchNftsData.nfts));
            }
        }
        if (searchNftsData?.nfts?.length === 0) {
            setPageMaxed(true);
        }
    }, [searchNftsData?.nfts, searchValue]);

    useEffect(() => {
        const mainContainer = document.getElementById("main-container");
        if (mainContainer) {
            mainContainer.addEventListener("scroll", () => {
                if (!pageMaxed && mainContainer.scrollTop + mainContainer.clientHeight >= mainContainer.scrollHeight) {
                    setPageNumber((prevPageNumber) => prevPageNumber + 1);
                }
            });
            return () => mainContainer.removeEventListener("scroll", () => null);
        }
    }, [pageMaxed]);

    const wordCloudParent = useRef<HTMLDivElement>(null);
    const allHashtags = useMemo(() => nfts.map(nft => nft.tokenURI.hashtags).flat(), [nfts]);

    const handleNftReport = useCallback((tokenId: number) => {
        setReportingNft(nfts.find(nft => nft.tokenId === tokenId));
    }, [nfts]);

    return (
        <>
            <SearchPageContainer ref={wordCloudParent}>
                <SearchBarContainer>
                    <SearchInput
                        type="text"
                        placeholder="Search..."
                        $isDarkMode={isDarkMode}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <SearchIcon />
                </SearchBarContainer>
                <SearchTabs
                    tabs={useMemo(() => [
                        TabOptions.NFTS,
                        TabOptions.POSTS,
                        TabOptions.USERS,
                        TabOptions.HASHTAGS
                    ], [])}
                    onTabChange={(tab) => setActiveTab((tab as TabOptions))}
                >
                    <TabContent>
                        <NftCards>
                            {
                                nfts.length > 0 && nfts.map((nft: NftInterface, index: number) => {
                                    return <NFTCard
                                        tokenId={nft.tokenId}
                                        title={nft.tokenURI.title}
                                        recipient={nft.recipient}
                                        price={nft.price}
                                        image={nft.tokenURI.image}
                                        likesCount={nft._count.nft_mumbai_likes}
                                        viewsCount={nft._count.nft_mumbai_views}
                                        hashtags={nft.tokenURI.hashtags}
                                        transactionHash={nft.transactionHash}
                                        key={index}
                                        onReport={() => handleNftReport(nft.tokenId)}
                                    />;
                                })
                            }
                        </NftCards>
                        <PaginationMessage>
                            {
                                isSearchNftsLoading && <img src={loadingSpinner} />
                            }
                            {
                                !isSearchNftsLoading && pageMaxed && <NoItemsMessage>No more items...</NoItemsMessage>
                            }
                        </PaginationMessage>
                    </TabContent>
                    <TabContent>
                        <SearchPostsList
                            posts={searchPostsData?.posts || []}
                            refreshPosts={searchPostsRefetch}
                        />
                    </TabContent>
                    <TabContent>
                        <SearchProfilesList users={searchUsersData?.users} />
                    </TabContent>
                    <TabContent>
                        <HashtagWordCloud
                            width={wordCloudParent?.current?.clientWidth * 0.9 || 500}
                            height={wordCloudParent?.current?.clientHeight * 0.8 || 500}
                            hashtags={allHashtags}
                        />
                    </TabContent>
                </SearchTabs>
            </SearchPageContainer>
            {reportingNft && <NftReportModal nft={reportingNft} />}
        </>
    );
});

export default SearchPage;