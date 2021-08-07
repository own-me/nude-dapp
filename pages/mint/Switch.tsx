import React, { useState } from "react";
import styled from "styled-components";

const SwitchContainer = styled.div`
    height: 30px;
    width: 60px;
    border: 1px solid #f7ceff;
    border-radius: 20px;
    background: #FBE0FF;
    user-select: none;
`;

const SwitchThumb = styled.div<{ $isActive: boolean }>`
    height: 100%;
    width: 45%;
    background: #ED7EFF;
    background: ${props => props.$isActive ? "#ED7EFF" : "#f4b0ff"};
    margin-left: ${props => props.$isActive ? 55 : 0}%;
    transition: all 0.5s ease-in-out;
    border-radius: 50%;
`;

interface SwitchProps {
    onChange?: (value: boolean) => void;
}

export default function Switch({ onChange }: SwitchProps) {
    const [isActive, setIsActive] = useState<boolean>(false);

    const handleToggle = (isActive) => {
        setIsActive(isActive);
        onChange && onChange(isActive);
    };

    return (
        <SwitchContainer onClick={() => handleToggle(!isActive)}>
            <SwitchThumb $isActive={isActive}></SwitchThumb>
        </SwitchContainer>
    );
};