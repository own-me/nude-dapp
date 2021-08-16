import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import Navbar from "../../components/Navbar";
import catNft from "../../media/defaults/catnft.png";
import NFTCard from "../../components/NFTCard";
import pinkCandy from "../../media/pink-candy.svg";
import DragDropInput from "./DragDropInput";
import Switch from "./Switch";
import FormInput from "../../components/FormInput";
import FormTextArea from "../../components/FormTextArea";
import { fetchNudeNftABI } from "../../lib/helpers";
import useWallet from "../../hooks/useWallet";
import { ethers } from "ethers";
import { usePostIpfsUploadMutation } from "../../redux/api/ipfs";

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

    const { balance, address, provider, signer } = useWallet();

    const [postIpfsUpload, {
        isLoading: isPostIpfsUploadLoading,
        isSuccess: isPostIpfsUploadSuccess,
        isError: isPostIpfsUploadError,
        data: postIpfsUploadData,
        error: postIpfsUploadError
    }] = usePostIpfsUploadMutation();

    const handleImageUpload = async () => {
        postIpfsUpload({ image });
    }

    const handleMintSubmit = async () => {
        const abi = await fetchNudeNftABI();
        const nudeNftContract = new ethers.Contract("0xdf9A1AF6dbCBC64A76b3bB967B768Cc9DC252d1c", abi.abi, provider);
        const nudeNftWithSigner = nudeNftContract.connect(signer);
        console.log(nudeNftWithSigner);
        const metadata = {
            title,
            description,
            image: "https://imgr.search.brave.com/Qp_lPYKOcMOX1R6O0tQ-giks5hPkB2RDtYon6mnX8fs/fit/960/576/no/1/aHR0cHM6Ly9kM2F0/YWd0MHJucWs3ay5j/bG91ZGZyb250Lm5l/dC93cC1jb250ZW50/L3VwbG9hZHMvMjAx/Ni8wNC8xMTIzNTkz/MC9jYW5uYWJpcy1h/bmQtY2F0LXZpZGVv/cy1nby1oYW5kLWlu/LWhhbmQtYWNjb3Jk/aW5nLXRvLWdvb2ds/ZS10cmVuZC5qcGc"
        }
        const tx = await nudeNftWithSigner.mintNFT(address, JSON.stringify(metadata));
        console.log(tx);
    }

    const queryNFTs = async () => {
        const abi = await fetchNudeNftABI();
        const nudeNftContract = new ethers.Contract("0xdf9A1AF6dbCBC64A76b3bB967B768Cc9DC252d1c", abi.abi, provider);
        const nudeNftWithSigner = nudeNftContract.connect(signer);
        const metadata = await nudeNftWithSigner.tokenURI(4);
        console.log(JSON.parse(metadata));
    }

    return (
        <>
            <Navbar />
            <MintPageContainer>
                <MintFormHeader>
                    <MintFormHeaderTitle>Mint an NFT</MintFormHeaderTitle>
                    <MintFormHeaderCandy src={pinkCandy} />
                </MintFormHeader>
                <ImagesRow>
                    <DragDropInput onImage={(image) => setImage(image)} onClear={() => setImage(null)} />
                    <NFTCard title={title || "King Tobi"} owner={"@thecatdad"} price={price + "ETH" || "? ETH"} rarity={[1, 8]} image={image || catNft} />
                </ImagesRow>
                <FormInput
                    type="text"
                    label="Title"
                    onChange={(value) => setTitle(value)}
                    errorMessage="Title is required."
                />
                <FormInput
                    type="number"
                    label="Price"
                    onChange={(value) => setPrice(value)}
                    errorMessage="Price is required."
                    min={0}
                />
                <FormTextArea
                    label="Description"
                    onChange={(value) => setDescription(value)}
                    errorMessage="Description is required."
                />
                <MintFormFooter>
                    <EncryptedLabel>Encrypted Content<Switch /></EncryptedLabel>
                    <SubmitButton onClick={handleMintSubmit}>MINT</SubmitButton>
                    <SubmitButton onClick={queryNFTs}>NFT</SubmitButton>
                    <SubmitButton onClick={handleImageUpload}>IPFS</SubmitButton>
                </MintFormFooter>
            </MintPageContainer>
        </>
    );
};