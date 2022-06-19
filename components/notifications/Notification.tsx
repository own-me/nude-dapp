import React, { memo } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";

const NotificationContainer = styled.div<{ $isDarkMode: boolean }>`
    
`;

const Notification = memo(() => {
    const { isDarkMode } = useAppSelector(state => state.app);

    return (
        <NotificationContainer $isDarkMode={isDarkMode}>
            <p>hello</p>
        </NotificationContainer>
    );
});

export default Notification;