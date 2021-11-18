import React, { memo } from "react";
import { createPortal } from "react-dom";
import styled from "styled-components";
import xIcon from "../media/icons/x.svg";
import { useAppSelector } from "../redux/hooks";

const MOUNTING_ID = "react-container";

const ModalContainer = styled.div`
    position: fixed;
    height: 100%;
    width: 100%;
    display: flex;
    align-content: center;
    justify-content: center;
    align-items: center;
    background: #0000005e;
    z-index: 10;
    top: 0;
`;

const ModalContent = styled.div<{ $isDarkMode: boolean }>`
    background-color: ${props => props.$isDarkMode ? props.theme.dark.backgroundColor2 : props.theme.light.backgroundColor};
    min-height: 55%;
    width: 60%;
    max-width: 800px;
    border-radius: 20px;
    border: 1px solid #0000005e;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    position: relative;
    color: ${props => props.$isDarkMode ? props.theme.dark.textColor : props.theme.light.textColor};

    @media (max-width: 1200px) {
        width: 90%;
    }
`;

const CloseIcon = styled.img`
    float: right;
    margin: 33px;
    cursor: pointer;
    height: 25px;

    :hover {
        transform: scale(1.1);
    }
`;

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
}

const Modal = memo(({ isOpen, onClose, children }: ModalProps) => {
    const isDarkMode = useAppSelector(state => state.app.isDarkMode);

    return (
        <>
            {
                isOpen && createPortal(<ModalContainer>
                    <ModalContent $isDarkMode={isDarkMode}>
                        <CloseIcon onClick={onClose} src={xIcon} />
                        {children}
                    </ModalContent>
                </ModalContainer>, document.getElementById(MOUNTING_ID))
            }
        </>
    );
});

export default Modal;