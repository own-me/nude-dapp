import React, { memo, ReactNode } from "react";
import styled from "styled-components";

const WIDTH = 200;

export const FormFileInputContainer = styled.div`
    width: ${WIDTH}px;
    position: relative;
    display: flex;
    cursor: pointer;
`;

const Button = styled.button`
    font-family: Poppins, Open Sans;
    height: 100%;
    font-family: Poppins,Open Sans;
    font-size: 16px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 25px;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    cursor: pointer;
`;

const Input = styled.input`
    position: absolute;
    height: 100%;
    width: 100%;
    opacity: 0;
    cursor: pointer;
`;

interface FormFileInputProps {
    onFile?: (file: File) => void;
    onData?: (data: string | ArrayBuffer) => void;
    children?: ReactNode;
}

const FormFileInput = memo(({ onFile, onData, children }: FormFileInputProps) => {

    const handleChange = (e) => {
        e.preventDefault();
        const file = e.target.files[0];
        onFile && onFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
            const data = e.target.result;
            onData && onData(data);
        };
        reader.readAsDataURL(file);
    };

    return (
        <FormFileInputContainer>
            <Input onChange={handleChange} type="file" />
            <Button>{children}</Button>
        </FormFileInputContainer>
    );
});

export default FormFileInput;