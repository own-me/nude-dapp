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
    width: 100%;
    margin: 10px 0px;
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
    float: right;
`;

interface MintFormInputProps {
    label: string;
    type: "text" | "email" | "password" | "number" | "select" | "checkbox" | "radio";
    onChange?: (value: string) => void;
    inputValue?: string;
    errorMessage?: string;
    placeHolder?: string;
}

const MintFormInput = memo(({ label, onChange, inputValue, errorMessage, type, placeHolder }: MintFormInputProps) => {
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
            <Input id={`${label}-input`} onChange={handleChange} value={value} type={type} placeholder={placeHolder} />
        </MintFormInputContainer>
    );
});

export default MintFormInput;