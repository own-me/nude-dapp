import React from "react";
import styled from "styled-components";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import Navbar from "../../components/Navbar";

const HomePageContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

export default function HomePage() {
    const name = useAppSelector(state => state.user.name);
    const dispatch = useAppDispatch();

    return (
        <>
            <Navbar />
            <HomePageContainer>
                <h1>Own Me!</h1>
            </HomePageContainer>
        </>
    );
};