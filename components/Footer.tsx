import React, { memo, useMemo } from "react";
import styled from "styled-components";

const FooterContainer = styled.div`
    height: 50px;
    background: white;
    color: black;
    justify-content: center;
    display: flex;
`;

const Footer = memo(() => {
    const year = useMemo(() => new Date().getFullYear(), []);
    return (
        <FooterContainer>
            <p>Copyright {year} Own Me Inc.</p>
        </FooterContainer>
    );
});

export default Footer;