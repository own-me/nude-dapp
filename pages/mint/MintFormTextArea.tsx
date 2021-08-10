import React, { memo, useState } from "react";
import styled from "styled-components";
import { formStyles } from "./MintFormInput";

const MintFormTextAreaContainer = styled.div`
    font-family: Poppins, Open Sans;
    width: 100%;
    margin: 10px 0px;
    position: relative;
`;

const Textarea = styled.textarea<{ $isError: boolean }>`
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

interface MintFormTextAreaProps {
    label: string;
    onChange?: (value: string) => void;
    inputValue?: string;
    errorMessage?: string;
    placeHolder?: string;
}

const MintFormTextArea = memo(({ label, onChange, inputValue, errorMessage, placeHolder }: MintFormTextAreaProps) => {
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
        <MintFormTextAreaContainer>
            <Label htmlFor={`${label}-textarea`}>{label}</Label>
            <Error>{error}</Error>
            <Textarea id={`${label}-textarea`} onChange={handleChange} value={value} placeholder={placeHolder} $isError={error} />
        </MintFormTextAreaContainer>
    );
});

export default MintFormTextArea;