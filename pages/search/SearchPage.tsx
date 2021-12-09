import React, { memo } from "react";
import styled from "styled-components";
import Tabs, { TabContent, Tab } from "../../components/Tabs";
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

const SearchPage = memo(() => {
    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    return (
        <SearchPageContainer>
            <SearchBar type="text" placeholder="Search..." $isDarkMode={isDarkMode} />
            <SearchTabs tabs={[
                "NFTs",
                "Posts (0)",
                "Users",
                "Activity"
            ]}>
                <TabContent>

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