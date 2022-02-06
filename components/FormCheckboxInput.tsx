import React, { memo, useCallback, useState } from "react";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";

export const FormFileInputContainer = styled.div<{ $isDarkMode: boolean }>`
    width: 100%;
    cursor: pointer;
    font-family: Poppins, Open Sans;
    color: ${props => props.$isDarkMode ? props.theme.dark.textColor : props.theme.light.textColor};
    display: flex;
`;

const CheckboxInput = styled.input`
    height: 25px;
    width: 25px;
    margin-right: 10px;
    cursor: pointer;
`;

const Label = styled.label`

`;

interface FormCheckboxInputProps {
    label: string;
    onChecked?: (checked: boolean) => void;
}

const FormCheckboxInput = memo(({ label, onChecked }: FormCheckboxInputProps) => {
    const [checked, setChecked] = useState<boolean>(false);

    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    const handleChange = useCallback(() => {
        onChecked && onChecked(!checked);
        setChecked(!checked);
    }, [checked, onChecked]);

    return (
        <FormFileInputContainer $isDarkMode={isDarkMode}>
            <CheckboxInput onChange={handleChange} type="checkbox" value={String(checked)}/>
            <Label>{label}</Label>
        </FormFileInputContainer>
    );
});

export default FormCheckboxInput;