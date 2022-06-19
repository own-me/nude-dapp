import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { Notification, removeNotification } from "../../redux/slices/app";

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

interface NotificationCardProps extends Omit<Notification, "key"> {
    notificationKey: number;
}

const NotificationCard = memo(({ notificationKey, title, message, type }: NotificationCardProps) => {
    const dispatch = useAppDispatch();
    const { isDarkMode } = useAppSelector(state => state.app);

    useEffect(() => {
        setTimeout(() => {
            dispatch(removeNotification({ key: notificationKey }));
        }, 5000);
    }, [dispatch, notificationKey]);

    return (
        <NotificationCardContainer $isDarkMode={isDarkMode}>
            <h1>{title}</h1>
            <h3>{message}</h3>
        </NotificationCardContainer>
    );
});

export default NotificationCard;