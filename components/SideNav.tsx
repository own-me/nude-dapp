import React, { memo } from "react";
import styled from "styled-components";
import { Transition } from 'react-transition-group';

const SideNavTimeout = 300;

const SideNavContainer = styled.div`
    width: 400px;
    height: calc(100% - 90px);
    position: fixed;
    top: 90px;
    right: 0;
    z-index: 3;
    background-color: #FF81EB;
    color: white;
    transition: transform ${SideNavTimeout}ms ease-in-out;
    box-shadow: 0 3px 6px #53414128, 0 3px 6px rgba(0, 0, 0, 0.23);

    &.entering {
        transform: translateX(100%);
    }

    &.exiting {
        transform: translateX(100%);
    }
`;

interface SideNavProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

const SideNav = memo(({ isOpen, setIsOpen }: SideNavProps) => {
    return (
        <Transition in={isOpen} timeout={{enter: 0, exit: SideNavTimeout}} mountOnEnter unmountOnExit>
            {transitionState => (
                <SideNavContainer className={transitionState}>
                    Side Nav
                </SideNavContainer>
            )}
        </Transition>
    );
});

export default SideNav;