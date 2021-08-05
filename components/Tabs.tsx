import React, { ReactNode, useState, useEffect, memo } from "react";
import styled, {css} from "styled-components";

interface TabsProps {
    children: ReactNode;
    tabs: Array<string>;
}

const TabsContainer = styled.div`
    color: black;
`;

const TabsHeader = styled.div`
    font-family: Poppins, Open Sans;
    display: flex;
    justify-content: space-around;
`;

const Tab = styled.div<{ $isActive: boolean }>`
    cursor: pointer;
    padding: 10px 20px;

    ${props => props.$isActive && css`
        border-bottom: 2px solid #D14FFF;
    `}
`;

export const TabContent = styled.div`

`;

const Tabs = memo(({ children, tabs }: TabsProps) => {
    const [activeTab, setActiveTab] = useState<string>();

    useEffect(() => {
        setActiveTab(tabs && tabs.length > 0 ? tabs[0] : null);
    }, [tabs]);

    return (
        <TabsContainer>
            <TabsHeader>
                {tabs.map((tab: string, index: number) => {
                    return <Tab key={index} $isActive={tab === activeTab} onClick={() => setActiveTab(tab)}>{tab}</Tab>;
                })}
            </TabsHeader>
            {tabs && tabs.length > 0 && children[tabs.indexOf(activeTab)]}
        </TabsContainer>
    );
});

export default Tabs;