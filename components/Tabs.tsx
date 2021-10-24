import React, { ReactNode, useState, useEffect, memo } from "react";
import styled, {css} from "styled-components";

const TabsContainer = styled.div`
    color: black;
`;

const TabsHeader = styled.div`
    font-family: Poppins, Open Sans;
    display: flex;
    justify-content: space-around;
    border-bottom: 1px #e0e0e0 solid;
`;

const Tab = styled.div<{ $isActive: boolean }>`
    cursor: pointer;
    padding: 10px 20px;
    opacity: 0.8;

    ${props => props.$isActive && css`
        border-bottom: 3px solid #D14FFF;
        font-weight: 600;
        opacity: 1;
    `}

    &:hover {
        border-bottom: 3px solid #d972ff;
        opacity: 1;
    }
`;

export const TabContent = styled.div`

`;

interface TabsProps {
    children: ReactNode;
    tabs: Array<string>;
}

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