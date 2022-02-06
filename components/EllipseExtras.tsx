import { EllipsisOutlined } from "@ant-design/icons";
import React, { memo, useState } from "react";
import { Transition } from "react-transition-group";
import styled from "styled-components";

export const EllipseExtrasContainer = styled.div`
    position: relative;
`;

const ExtrasIcon = styled(EllipsisOutlined)`
    cursor: pointer;
    padding-right: 5px;
    font-size: 20px;
    padding: 5px;

    :hover {
        color: #FF81EB;
    }
`;

const ExtrasPanelContainer = styled.div`
    min-height: 60px;
    min-width: 80px;
    background-color: #FF81EB;
    position: absolute;
    bottom: 30px;
    right: 5px;
    z-index: 4;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding: 5px 10px;
    text-align: right;

    &.entering {
        opacity: 0;
    }

    &.entered {
        opacity: 1;
    }
`;

const ExtrasPanelAction = styled.div`
    color: white;
    cursor: pointer;

    a {
        text-decoration: none;
        color: white;
        cursor: pointer;
    }

    a:hover {
        color: #8336ff;
    }

    :hover {
        color: #8336ff;
    }
`;

export interface ExtraAction {
    text: string;
    onClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    link?: string;
}

interface EllispeExtrasProps {
    extraActions: ExtraAction[];
    className?: string;
}

const ExtrasPanel = memo(({ extraActions = [] }: EllispeExtrasProps) => {
    return (
        <ExtrasPanelContainer>
            {
                extraActions.map((item, index) => (
                    <ExtrasPanelAction key={index} onClick={item.onClick}>
                        {
                            item.link ? <a href={item.link} target="_blank">{item.text}</a> : item.text
                        }
                    </ExtrasPanelAction>
                ))
            }
        </ExtrasPanelContainer>
    );
});

const EllipseExtras = memo(({ extraActions = [], className }: EllispeExtrasProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEllipseClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <EllipseExtrasContainer className={className} onMouseEnter={() => setIsOpen(true)} onMouseLeave={() => setIsOpen(false)}>
            <ExtrasIcon onClick={handleEllipseClick} />
            <Transition in={isOpen} timeout={250} mountOnEnter unmountOnExit>
                {transitionState => (
                    <ExtrasPanel className={transitionState} extraActions={extraActions} />
                )}
            </Transition>
        </EllipseExtrasContainer>
    );
});

export default EllipseExtras;