import React, { memo } from "react";
import styled from "styled-components";
import { ZIndex } from "../../lib/zindex";
import { useAppSelector } from "../../redux/hooks";
import NotificationCard from "./NotificationCard";

const NotificationsContainer = styled.div<{ $isDarkMode: boolean }>`
    position: fixed;
    display: flex;
    bottom: 0;
    right: 0;
    flex-direction: column;
    align-items: flex-end;
    justify-content: flex-end;
    z-index: ${ZIndex.NOTIFICATION};
    padding: 0px 20px;
`;

const NotificationsManager = memo(() => {
    const { notifications, isDarkMode } = useAppSelector(state => state.app);

    return (
        <NotificationsContainer $isDarkMode={isDarkMode}>
            {
                Object.values(notifications).map(({ key, title, message, type }, index) => (
                    <NotificationCard
                        key={index}
                        notificationKey={key}
                        title={title}
                        message={message}
                        type={type}
                    />
                ))
            }
        </NotificationsContainer>
    );
});

export default NotificationsManager;