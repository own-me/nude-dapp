import React, { ReactNode, useState, useEffect, memo } from "react";
import styled, { css } from "styled-components";

export const TabsContainer = styled.div`
    width: 100%;
    margin: 0 auto;

    @media (max-width: 1200px) {
        width: 100%;
    }
`;

const TabsHeader = styled.div`
    font-family: Poppins, Open Sans;
    display: flex;
    justify-content: space-evenly;
    border-bottom: 1px #e0e0e0 solid;
`;

export const Tab = styled.div<{ $isActive: boolean }>`
    cursor: pointer;
    opacity: 0.8;
    font-size: 16px;
    padding: 10px 80px;

    ${props => props.$isActive && css`
        border-bottom: 3px solid #D14FFF;
        font-weight: 600;
        opacity: 1;
    `}

    &:hover {
        border-bottom: 3px solid #d972ff;
        opacity: 1;
    }

    @media (max-width: 1200px) {
        padding: 10px 20px;
    }
`;

export const TabContent = styled.div`

`;

interface TabsProps {
    children: ReactNode;
    tabs: Array<string>;
    className?: string;
}

const Tabs = memo(({ children, tabs, className }: TabsProps) => {
    const [activeTab, setActiveTab] = useState<string>();

    useEffect(() => {
        setActiveTab(tabs && tabs.length > 0 ? tabs[0] : null);
    }, [tabs]);

    return (
        <TabsContainer className={className}>
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