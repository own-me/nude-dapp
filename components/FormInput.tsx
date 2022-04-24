import React, { InputHTMLAttributes, memo, useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useAppSelector } from "../redux/hooks";

export const formStyles = css<{ $isError?: boolean, $isDarkMode: boolean }>`
    font-family: Poppins, Open Sans;
    background-color: ${props => props.$isDarkMode ? "#1c012a" : "#FFFDFF"};
    color: ${props => props.$isDarkMode ? "white" : "black"};
    border: 1px solid ${props => props.$isError ? "red" : "#cc00ff"};
    padding: 10px 15px;
    border-radius: 5px;
    font-size: 20px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    width: 100%;
    
    @media (max-width: ${props => props.theme.breakpoints.desktop}px) {
        padding: 5px 15px;
    }
`;

const FormInputContainer = styled.div`
    font-family: Poppins, Open Sans;
    width: 100%;
    margin: 10px 0px;
    position: relative;
`;

const Input = styled.input<{ $isError?: boolean, $isDarkMode: boolean }>`
    ${formStyles};
`;

export const Label = styled.label`
    text-align: left;
    display: block;
    font-size: 26px;
    padding: 10px 0px;
`;

const InfoText = styled.span`
    color: red;
    position: absolute;
    right: 15px;
    top: 25px;
`;

const ErrorText = styled(InfoText)`
    color: red;

`;

const OptionalText = styled(InfoText)`
    color: #505050;
    @media (max-width: ${props => props.theme.breakpoints.desktop}px) {
        top: 5px;
        font-size: 12px;
    }
`;

export interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    type: "text" | "email" | "password" | "number" | "select" | "checkbox" | "radio";
    inputValue?: string;
    errorMessage?: string;
    optional?: boolean;
    className?: string;
}

const FormInput = memo(({ label, onChange, inputValue, errorMessage, type, placeholder, min, optional, className }: FormInputProps) => {
    const [value, setValue] = useState<string>(inputValue || "");
    const [error, setError] = useState<string>("");

    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    const handleChange = (e) => {
        const value = e.target?.value;
        if (!value && !optional) {
            setError(errorMessage || "Input invalid.");
        } else if (error && value) {
            setError("");
        }
        setValue(value);
        onChange && onChange(e);
    };

    useEffect(() => {
        inputValue && setValue(inputValue || "");
    }, [inputValue]);

    return (
        <FormInputContainer className={className}>
            <Label htmlFor={`${label}-input`}>{label}</Label>
            {error && <ErrorText>{error}</ErrorText>}
            {optional && !error && <OptionalText>optional</OptionalText>}
            <Input id={`${label}-input`} onChange={handleChange} value={value} type={type} placeholder={placeholder} min={min} $isError={!!error} $isDarkMode={isDarkMode} />
        </FormInputContainer>
    );
});

export default FormInput;