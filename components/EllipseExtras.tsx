import { EllipsisOutlined } from "@ant-design/icons";
import React, { memo, useState } from "react";
import styled from "styled-components";

const EllipseExtrasContainer = styled.div`
    position: relative;
`;

const ExtrasIcon = styled(EllipsisOutlined)`
    cursor: pointer;
    padding-right: 5px;

    :hover {
        color: #FF81EB;
    }
`;

const ExtrasPanelContainer = styled.div`
    min-height: 80px;
    min-width: 80px;
    background-color: #FF81EB;
    position: absolute;
    bottom: 25px;
    right: 5px;
    z-index: 4;
    border-radius: 5px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    padding: 5px;
`;

const ExtrasPanelAction = styled.div`
    color: white;
    cursor: pointer;

    :hover {
        color: #E127FF;
    }
`;

export interface ExtraAction {
    text: string;
    onClick: () => void;
}

interface EllispeExtrasProps {
    extraActions: ExtraAction[];
}

const ExtrasPanel = memo(({ extraActions = [] }: EllispeExtrasProps) => {
    return (
        <ExtrasPanelContainer>
            {
                extraActions.map((item, index) => (
                    <ExtrasPanelAction key={index} onClick={item.onClick}>
                        {item.text}
                    </ExtrasPanelAction>
                ))
            }
        </ExtrasPanelContainer>
    );
});

const EllipseExtras = memo(({ extraActions = [] }: EllispeExtrasProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const handleEllipseClick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsOpen(!isOpen);
    };

    return (
        <EllipseExtrasContainer>
            <ExtrasIcon onClick={handleEllipseClick} />
            {
                isOpen && <ExtrasPanel extraActions={extraActions} />
            }
        </EllipseExtrasContainer>
    );
});

export default EllipseExtras;