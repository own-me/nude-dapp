import React, { memo } from "react";
import styled from "styled-components";
import Navbar from "../../components/Navbar";

const NftPageContainer = styled.div`
    color: black;
`;


interface NftPageProps {

}

const NftPage = memo((props: NftPageProps) => {

    return (
        <>
            <Navbar />
            <NftPageContainer>
                <h1>NFT</h1>
            </NftPageContainer>
        </>
    );
});

export default NftPage;