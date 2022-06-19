import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";
import Notification from "./Notification";

const NotificationsContainer = styled.div<{ $isDarkMode: boolean }>`
    position: fixed;
    width: 100%;
    height: 100%;
`;

const NotificationsManager = memo(() => {
    const { notifications, isDarkMode } = useAppSelector(state => state.app);

    useEffect(() => {
        console.log(console.log("notifications", notifications));
    }, [notifications]);

    return (
        <NotificationsContainer $isDarkMode={isDarkMode}>
            {
                notifications.map((notification, index) => (
                    <Notification key={index} />
                ))
            }
        </NotificationsContainer>
    );
});

export default NotificationsManager;