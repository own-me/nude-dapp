import React, { useState, useEffect } from "react";
import styled from "styled-components";
import xIcon from "../../media/icons/x.svg";

const DragDropInputContainer = styled.div`
    width: 300px;
    height: 200px;
    border: 3px dashed #f296ff;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
`;

const Input = styled.input`
    width: 100%;
    height: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 2;
`;

const Button = styled.div`
    font-family: Poppins, Open Sans;
    font-size: 22px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 8px 40px;
    border-radius: 6px;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    position: absolute;
    z-index: 1;
`;

const PreviewImage = styled.img`
    z-index: 2;
    height: 75%;
`;

const ClearButton = styled.img`
    position: absolute;
    z-index: 2;
    top: 15px;
    right: 20px;
    cursor: pointer;

    :hover {
        transform: scale(1.1);
    }
`;

export default function DragDropInput() {
    const [imageFile, setImageFile] = useState<File>();
    const [previewImage, setPreviewImage] = useState<any>();

    useEffect(() => {
        console.log(imageFile);
        readFile(imageFile);
    }, [imageFile]);

    const readFile = async (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewImage(reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleClear = () => {
        setImageFile(null);
        setPreviewImage(null);
    };

    return (
        <DragDropInputContainer>
            {
                !previewImage && <>
                    <Input type="file" onChange={(e) => setImageFile(e.target.files[0])} />
                    <Button>Drop File</Button>
                </>
            }
            {
                previewImage && <>
                    <PreviewImage src={previewImage} />
                    <ClearButton src={xIcon} onClick={handleClear} />
                </>
            }
        </DragDropInputContainer>
    );
};