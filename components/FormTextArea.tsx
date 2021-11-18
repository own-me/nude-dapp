import React, { memo, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import { formStyles } from "./FormInput";

const FormTextAreaContainer = styled.div`
    font-family: Poppins, Open Sans;
    width: 100%;
    margin: 10px 0px;
    position: relative;
`;

const Textarea = styled.textarea<{ $isError: boolean, $isDarkMode: boolean }>`
    ${formStyles};
    max-width: 100%;
`;

const Label = styled.label`
    text-align: left;
    display: block;
    font-size: 26px;
`;

const Error = styled.span`
    color: red;
    position: absolute;
    right: 15px;
    top: 15px;
`;

interface FormTextAreaProps {
    label: string;
    onChange?: (value: string) => void;
    inputValue?: string;
    errorMessage?: string;
    placeHolder?: string;
}

const FormTextArea = memo(({ label, onChange, inputValue, errorMessage, placeHolder }: FormTextAreaProps) => {
    const [value, setValue] = useState<string>(inputValue || "");
    const [error, setError] = useState<string>("");

    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    const handleChange = (e) => {
        const value = e.target?.value;
        if (!value) {
            setError(errorMessage || "Error, input is invalid.");
        }
        setValue(value);
        onChange && onChange(value);
    };

    return (
        <FormTextAreaContainer>
            <Label htmlFor={`${label}-textarea`}>{label}</Label>
            <Error>{error}</Error>
            <Textarea id={`${label}-textarea`} onChange={handleChange} value={value} placeholder={placeHolder} $isError={error} $isDarkMode={isDarkMode} />
        </FormTextAreaContainer>
    );
});

export default FormTextArea;