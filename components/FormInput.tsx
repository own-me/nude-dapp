import React from "react";
import styled from "styled-components";

const Label = styled.label`
    color: black;
    font-family: Poppins, Open Sans;
    font-size: 22px;
`;

const Input = styled.input`
    background: #FFFFFF;
    border: 1px solid #FFA2FB;
    box-sizing: border-box;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 5px;
    padding: 8px 15px;
    margin-bottom: 20px;
    font-size: 18px;
`;

interface FormInput {
    label: string
};

export default function FormInput({ label, ...props }) {
    return <>
        <Label htmlFor={label}>{label}</Label>
        <Input id={label} {...props} />
    </>
};