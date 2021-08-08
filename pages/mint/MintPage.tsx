import React, { useState } from "react";
import styled, { css } from "styled-components";
import Navbar from "../../components/Navbar";
import catNft from "../../media/defaults/catnft.png";
import NFTCard from "../../components/NFTCard";
import pinkCandy from "../../media/pink-candy.svg";
import DragDropInput from "./DragDropInput";
import Switch from "./Switch";
import MintFormInput from "./MintFormInput";

const MintPageContainer = styled.div`
    font-family: Poppins, Open Sans;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    color: black;
    width: 50%;
    margin: 0 auto;

    @media (max-width: 1200px) {
        width: 90%;
    }
`;

const MintFormHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

const MintFormHeaderTitle = styled.h1`
    font-family: Rock Salt, Open Sans;
    font-size: 40px;
`;

const MintFormHeaderCandy = styled.img`
    height: 60px;
`;

const MintFormContainer = styled.div`
    width: 100%;
    margin: 10px 0px;
`;

const MintLabel = styled.label`
    text-align: left;
    display: block;
    font-size: 30px;
`;

const formStyles = css`
    background-color: #FFFDFF;
    border: 1px solid #DC68F9;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    outline: none;
    width: 100%;
`;

const MintTextArea = styled.textarea`
    ${formStyles};
`;

const MintFormFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 30px;
`;

const SubmitButton = styled.button`
        font-family: Poppins, Open Sans;
        font-size: 22px;
        background-color: #FF81EB;
        color: white;
        border: none;
        padding: 8px 40px;
        border-radius: 6px;
        margin-left: 50px;
        box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
        cursor: pointer;
`;

const EncryptedLabel = styled.h3`
    margin: 0;
`;

const ImagesRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
`;

export default function MintPage() {
    const [title, setTitle] = useState<string>("");
    const [price, setPrice] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [image, setImage] = useState<string | ArrayBuffer>("");

    return (
        <>
            <Navbar />
            <MintPageContainer>
                <MintFormHeader>
                    <MintFormHeaderTitle>Mint an NFT</MintFormHeaderTitle>
                    <MintFormHeaderCandy src={pinkCandy} />
                </MintFormHeader>
                <ImagesRow>
                    <DragDropInput onImage={(image) => setImage(image)} onClear={() => setImage(null)}/>
                    <NFTCard title={title || "King Tobi"} owner={"@thecatdad"} price={price + "ETH" || "? ETH"} rarity={[1, 8]} image={image || catNft} />
                </ImagesRow>

                <MintFormInput 
                    type="text" 
                    label="Title" 
                    onChange={(value) => setTitle(value)} 
                    errorMessage="Title is required." 
                />

                <MintFormInput 
                    type="number" 
                    label="Price" 
                    onChange={(value) => setPrice(value)} 
                    errorMessage="Price is required." 
                />

                <MintFormContainer>
                    <MintLabel htmlFor="descriptionInput">Description</MintLabel>
                    <MintTextArea id="descriptionInput" onChange={(e) => setDescription(e.target.value)} value={description} />
                </MintFormContainer>
                <MintFormFooter>
                    <EncryptedLabel>Encrypted Content<Switch /></EncryptedLabel>
                    <SubmitButton onClick={() => alert("Submitted!")}>MINT</SubmitButton>
                </MintFormFooter>
            </MintPageContainer>
        </>
    );
};