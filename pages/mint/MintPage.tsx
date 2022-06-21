import React, { useState } from "react";
import styled from "styled-components";
import catNft from "../../media/defaults/catnft.png";
import NFTCard from "../../components/NFTCard";
import pinkCandy from "../../media/pink-candy.svg";
import DragDropInput from "./DragDropInput";
import Switch from "./Switch";
import FormInput from "../../components/FormInput";
import FormTextArea from "../../components/FormTextArea";
import useWallet from "../../hooks/useWallet";
import { usePostIpfsUploadMutation } from "../../api/ipfs";
import FormHashtagInput from "../../components/FormHashtagInput";
import { NudeNFT__factory } from "../../typechain/factories/NudeNFT__factory";
import { useAppDispatch } from "../../redux/hooks";
import { addNotification } from "../../redux/slices/app";

export const MintPageContainer = styled.div`
    font-family: Poppins, Open Sans;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-direction: column;
    width: 50%;
    max-width: 900px;
    margin: 0 auto;
    padding: 0px 5%;
    transition: width 0.5s ease-in-out;

    @media (max-width: 1200px) {
        width: 90%;
    }
`;

export const MintFormHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
`;

export const MintFormHeaderTitle = styled.h1`
    font-family: Rock Salt, Open Sans;
    font-size: 40px;
`;

export const MintFormHeaderCandy = styled.img`
    height: 60px;
`;

const MintFormFooter = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
    margin-top: 30px;
`;

export const SubmitButton = styled.button`
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

const LeftRow = styled.div`
    display: flex;
    height: 100%;
    width: 100%;
    align-items: flex-start;
    flex-direction: column;
    justify-content: space-around;
`;


const RightRow = styled.div`
    display: flex;
    width: 100%;
    justify-content: flex-end;
`;

export default function MintPage() {
    const dispatch = useAppDispatch();
    const { address, provider, signer } = useWallet();

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [hashtags, setHashtags] = useState<string>("");
    const [imagePreview, setImagePreview] = useState<string>();
    const [imageData, setImageData] = useState<File>();

    const [postIpfsUpload] = usePostIpfsUploadMutation();

    const handleMintSubmit = async () => {
        const formData = new FormData();
        formData.append("image", imageData);
        const ipfsResponse = await postIpfsUpload(formData);
        if (ipfsResponse) {
            const nudeNftContract = NudeNFT__factory.connect(process.env.NUDE_NFT_ADDRESS, provider);
            const nudeNftWithSigner = nudeNftContract.connect(signer);
            const metadata = {
                title,
                description,
                hashtags: hashtags.split(" "),
                image: ipfsResponse.data.ipfsUrl
            };
            nudeNftWithSigner.mintNFT(address, JSON.stringify(metadata))
                .then(tx => {
                    console.log(tx);
                    dispatch(addNotification({
                        title: "Minted NUDE NFT!",
                        message: title,
                        type: "success"
                    }));
                })
                .catch(e => {
                    console.log(e);
                    dispatch(addNotification({
                        title: "Mint Error",
                        message: e.message,
                        type: "error"
                    }));
                });
        } else {
            dispatch(addNotification({
                title: "Error",
                message: "Issue uploading image to IPFS.",
                type: "error"
            }));
        }
    };

    const clearImage = () => {
        setImagePreview(null);
    };

    return (
        <MintPageContainer>
            <MintFormHeader>
                <MintFormHeaderTitle>Mint an NFT</MintFormHeaderTitle>
                <MintFormHeaderCandy src={pinkCandy} />
            </MintFormHeader>
            <ImagesRow>
                <LeftRow>
                    <DragDropInput
                        onBase64={(image) => setImagePreview(image)}
                        onChange={(image) => setImageData(image)}
                        onClear={clearImage}
                    />
                </LeftRow>
                <RightRow>
                    <NFTCard
                        title={title || "King Tobi"}
                        recipient={"@thecatdad"}
                        image={imagePreview || catNft}
                        likesCount={0}
                        viewsCount={0}
                        hashtags={hashtags.split(" ")}
                        onReport={() => console.log("report")}
                    />
                </RightRow>
            </ImagesRow>
            <FormInput
                type="text"
                label="Title"
                onChange={(e) => setTitle(e.target.value)}
                errorMessage="Title is required."
            />
            <FormTextArea
                label="Description"
                onChange={(value) => setDescription(value)}
                errorMessage="Description is required."
            />
            <FormHashtagInput
                type="text"
                label="Hashtags"
                onChange={(value) => setHashtags(value)}
                value={hashtags}
                errorMessage="Hashtags are required."
                placeholder="#"
            />
            <MintFormFooter>
                <EncryptedLabel>Encrypted Content<Switch /></EncryptedLabel>
                <SubmitButton onClick={handleMintSubmit}>MINT</SubmitButton>
            </MintFormFooter>
        </MintPageContainer>
    );
}