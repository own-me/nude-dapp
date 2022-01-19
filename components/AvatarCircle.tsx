import React, { memo } from "react";
import styled from "styled-components";

const AvatarCircleContainer = styled.div`
    height: 46px;
    width: 46px;
    border-radius: 50px;
    cursor: pointer;
    padding-left: 20px;
`;

const AvatarImage = styled.img`
    height: 100%;
    width: 100%;
    border: 2px solid white;
    border-radius: 50px;
    background: white;
    box-shadow: 0 1px 3px rgb(0 0 0 / 12%), 0 1px 2px rgb(0 0 0 / 24%);
`;

interface AvatarCircleProps {
    image: string;
    onClick: () => void;
}

const AvatarCircle = memo(({ image, onClick }: AvatarCircleProps) => {
    return (
        <AvatarCircleContainer onClick={onClick}>
            <AvatarImage src={image} />
        </AvatarCircleContainer>
    );
});

export default AvatarCircle;