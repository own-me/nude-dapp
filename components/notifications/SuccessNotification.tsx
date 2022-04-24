import React from "react";
import styled from "styled-components";
import gears from "./../../media/gears.svg";
import { Link } from "react-router-dom";

const Position = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  background: #eeaefa75;
  z-index: 3;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 400px;
  max-height: calc(100% - 8rem);
  margin: 4rem;
  background: #fff;
  box-shadow: 1px 1px 10px #540748;
  border: 1px solid #fc2aff;
  overflow-y: auto;
  border-radius: 20px;
  @media (min-width: ${props => props.theme.breakpoints.mobile}px) {
    max-width: 300px;
    }
`;

const Title = styled.div`
  font-family: Rock Salt, Open Sans; 
  color: #f72aff;
  font-size: 20px;
  position: relative;
  display: flex;
  flex: 0 0 auto;
  padding: 0.5em 1em;
`;

const SubTitle = styled.div`
  font-family: Poppins, Open Sans;
  position: relative;
  display: flex;
  flex: 0 0 auto;
  padding: 1rem;
`;

const Content = styled.div`
  display: flex;
  flex: 1 1 auto;
  padding: .25rem 1rem;
  overflow-y: auto;
  text-align: center;
`;

const Actions = styled.div`
  display: flex;
  flex: 0 0 auto;
  padding: 1rem;
`;

const Button = styled.button`
  padding: .5rem 1rem;
  font-size: 1rem;
  border: 0;
  background: #FF81EB;
  cursor: pointer;
  color: white;
  border-radius: 25px;
  
    &:hover {
    background: #f09;     
    }
`;

const Gears = styled.img`
    height: 50px;
`;

export default function SuccessNotification() {
    return (
        <Position>
            <Container>
                <Title>Success !!</Title>
                <Gears src={gears} />
                <SubTitle>
                    You have minted your NFT.
                </SubTitle>
                <Content>
                    Please note, your NFT may take up to 5 minutes to show up in your collection!
                </Content>
                <Actions>
                    <Link to="/">
                        <Button> Okay ! </Button>
                    </Link>
                </Actions >
            </Container>
        </Position>
    );
}