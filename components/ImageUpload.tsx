import React from "react";
import styled from "styled-components";

const ImageUploadInput = styled.input`

`;

interface ImageUploadProps {
    onImage: (image: string | ArrayBuffer) => void;
}

export default function ImageUpload({ onImage }: ImageUploadProps) {
    function handleImageUpload(e) {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const image = e.target.result;
            onImage(image);
        };
        reader.readAsDataURL(file);
    };
    return <ImageUploadInput type="file" onChange={handleImageUpload} />
};