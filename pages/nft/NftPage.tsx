import React, { memo } from "react";
import styled from "styled-components";

const NftPageContainer = styled.div`

`;


interface NftPageProps {

}

const NftPage = memo((props: NftPageProps) => {

    return (
        <NftPageContainer>
            <h1>NFT</h1>
        </NftPageContainer>
    );
});

export default NftPage;