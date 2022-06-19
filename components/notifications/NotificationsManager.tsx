import React, { memo, useEffect } from "react";
import styled from "styled-components";
import { ZIndex } from "../../lib/zindex";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { addNotification } from "../../redux/slices/app";
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
    const dispatch = useAppDispatch();
    const { notifications, isDarkMode } = useAppSelector(state => state.app);

    useEffect(() => {
        console.log(console.log("notifications", notifications));
    }, [notifications]);

    useEffect(() => {
        dispatch(addNotification({
            title: "Minted NUDE NFT",
            message: "You minted a NUDE NFT",
            type: "success"
        }));
    }, [dispatch]);

    return (
        <NotificationsContainer $isDarkMode={isDarkMode}>
            {
                notifications.map(({ title, message, type }, index) => (
                    <NotificationCard title={title} message={message} type={type} key={index} />
                ))
            }
        </NotificationsContainer>
    );
});

export default NotificationsManager;