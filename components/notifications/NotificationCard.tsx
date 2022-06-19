import React, { memo } from "react";
import styled from "styled-components";
import { useAppSelector } from "../../redux/hooks";
import { Notification } from "../../redux/slices/app";

const NotificationCardContainer = styled.div<{ $isDarkMode: boolean }>`
    font-family: Poppins, Open Sans;
    width: 400px;
    height: 180px;
    border-radius: 8px;
    padding: 0px 25px;
    margin-bottom: 8px;
    background-color: ${props => props.$isDarkMode ? props.theme.light.backgroundColor : props.theme.dark.backgroundColor};
    color: ${props => props.$isDarkMode ? props.theme.light.textColor : props.theme.dark.textColor};
`;

const NotificationCard = memo(({ title, message, type }: Notification) => {
    const { isDarkMode } = useAppSelector(state => state.app);

    return (
        <NotificationCardContainer $isDarkMode={isDarkMode}>
            <h1>{title}</h1>
            <h3>{message}</h3>
        </NotificationCardContainer>
    );
});

export default NotificationCard;