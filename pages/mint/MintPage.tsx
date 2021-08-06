import React, { useState } from "react";
import styled, { css } from "styled-components";
import Navbar from "../../components/Navbar";
import catNft from "../../media/defaults/catnft.png";
import NFTCard from "../../components/NFTCard";

const MintPageContainer = styled.div`
    font-family: Poppins, Open Sans;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    color: black;
`;

const MintFormHeader = styled.h1`
    font-family: Rock Salt, Open Sans;
`;

const MintFormContainer = styled.div`

`;


const MintLabel = styled.label`
    text-align: left;
    display: block;
    font-size: 30px;
    margin-bottom: 5px;
`;

const formStyles = css`
    background-color: #FFFDFF;
    border: 1px solid #DC68F9;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    outline: none;
`;

const MintForm = styled.input`
    ${formStyles};
`;

const MintTextArea = styled.textarea`
    ${formStyles};
`;

const SubmitButton = styled.button`
        font-family: Poppins, Open Sans;
        font-size: 22px;
        background-color: #FF81EB;
        color: white;
        border: none;
        padding: 8px 15px;
        border-radius: 6px;
        margin-left: 50px;
        box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
        cursor: pointer;
`;

export default function MintPage() {
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<string>("0");
    const [description, setDescription] = useState<string>("");

    return (
        <>
            <Navbar />
            <MintPageContainer>
                <MintFormHeader>Mint an NFT</MintFormHeader>
                <NFTCard title={"King Tobi"} owner={"@thecatdad"} price={"2.45 ETH"} rarity={[1, 8]} image={catNft} />
                <MintFormContainer>
                    <MintLabel htmlFor="titleInput">Title</MintLabel>
                    <MintForm type="text" id="titleInput" onChange={(e) => setTitle(e.target.value)} value={title} />
                </MintFormContainer>
                <MintFormContainer>
                    <MintLabel htmlFor="priceInput">Price</MintLabel>
                    <MintForm type="number" id="priceInput" onChange={(e) => setPrice(e.target.value)} value={price} />
                </MintFormContainer>
                <MintFormContainer>
                    <MintLabel htmlFor="descriptionInput">Description</MintLabel>
                    <MintTextArea id="descriptionInput" onChange={(e) => setDescription(e.target.value)} value={description} />
                </MintFormContainer>
                <SubmitButton onClick={() => alert("Submitted!")}>MINT</SubmitButton>
            </MintPageContainer>
        </>
    );
};