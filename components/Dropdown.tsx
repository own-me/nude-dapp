import React, { memo } from "react";
import styled from "styled-components";
import { Transition } from "react-transition-group";
import { useAppSelector } from "../redux/hooks";
import { ZIndex } from "../lib/zindex";

const DropdownContainer = styled.div<{ $isDarkMode: boolean }>`
    padding: 40px 40px 20px 40px;
    background-color: ${props => props.$isDarkMode ? props.theme.dark.backgroundColor2 : props.theme.light.backgroundColor};
    color: ${props => props.$isDarkMode ? props.theme.dark.textColor : props.theme.light.textColor};
    position: fixed;
    top: 95px;
    right: 5px;
    align-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 10px;
    border: 1px solid #FECDFF;
    transition: opacity 150ms ease-in-out;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    z-index: ${ZIndex.DROPDOWN};

    &.entering {
        opacity: 0;
    }

    &.entered {
        opacity: 1;
    }
`;

interface DropdownProps {
    children: React.ReactNode;
    isOpen: boolean;
}

const Dropdown = memo(({ children, isOpen }: DropdownProps) => {
    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    return (
        <Transition in={isOpen} timeout={150} mountOnEnter unmountOnExit>
            {transitionState => (
                <DropdownContainer className={transitionState} $isDarkMode={isDarkMode}>
                    {children}
                </DropdownContainer>
            )}
        </Transition>
    );
});

export default Dropdown;