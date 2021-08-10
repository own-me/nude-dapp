import React, { memo, useState } from "react";
import styled, { css } from "styled-components";

export const formStyles = css`
    background-color: #FFFDFF;
    border: 1px solid #DC68F9;
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 25px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    outline: none;
    width: 100%;
`;

const MintFormInputContainer = styled.div`
    font-family: Poppins, Open Sans;
    width: 100%;
    margin: 10px 0px;
    position: relative;
`;

const Input = styled.input`
    ${formStyles};
`;

const Label = styled.label`
    text-align: left;
    display: block;
    font-size: 30px;
`;

const Error = styled.span`
    color: red;
    position: absolute;
    right: 15px;
    top: 15px;
`;

interface MintFormInputProps {
    label: string;
    type: "text" | "email" | "password" | "number" | "select" | "checkbox" | "radio";
    onChange?: (value: string) => void;
    inputValue?: string;
    errorMessage?: string;
    placeHolder?: string;
    min?: number;
}

const MintFormInput = memo(({ label, onChange, inputValue, errorMessage, type, placeHolder, min }: MintFormInputProps) => {
    const [value, setValue] = useState<string>(inputValue || "");
    const [error, setError] = useState<string>("");

    const handleChange = (e) => {
        const value = e.target?.value;
        if (!value) {
            setError(errorMessage || "Error, input is invalid.");
        }
        setValue(value);
        onChange && onChange(value);
    };

    return (
        <MintFormInputContainer>
            <Label htmlFor={`${label}-input`}>{label}</Label>
            <Error>{error}</Error>
            <Input id={`${label}-input`} onChange={handleChange} value={value} type={type} placeholder={placeHolder} min={min} />
        </MintFormInputContainer>
    );
});

export default MintFormInput;