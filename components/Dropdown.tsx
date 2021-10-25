import React, { memo } from "react";
import styled from "styled-components";
import { Transition } from 'react-transition-group';

const DropdownContainer = styled.div`
    padding: 40px 40px 20px 40px;
    background: #FDE5FE;
    color: black;
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
    return (
        <Transition in={isOpen} timeout={150} mountOnEnter unmountOnExit>
            {transitionState => (
                <DropdownContainer className={transitionState}>
                    {children}
                </DropdownContainer>
            )}
        </Transition>
    );
});

export default Dropdown;