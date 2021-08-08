import React, { memo, useState } from "react";
import styled from "styled-components";
import { formStyles } from "./MintFormInput";

const MintFormTextAreaContainer = styled.div`
    width: 100%;
    margin: 10px 0px;
`;

const Textarea = styled.textarea`
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
            <Textarea id={`${label}-textarea`} onChange={handleChange} value={value} placeholder={placeHolder} />
        </MintFormTextAreaContainer>
    );
});

export default MintFormTextArea;