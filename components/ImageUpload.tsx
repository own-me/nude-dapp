import React from "react";
import styled from "styled-components";

const ImageUploadInput = styled.input`

`;

export default function ImageUpload({ onChange }) {
    function handleImageUpload(e) {
        e.preventDefault();
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = function(e) {
            const image = e.target.result;
            onChange(image);
        };
        reader.readAsDataURL(file);
    };
    return <ImageUploadInput type="file" onChange={handleImageUpload} />
};