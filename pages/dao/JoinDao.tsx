import React, { useCallback } from "react";
import styled from "styled-components";
import useWallet from "../../hooks/useWallet";
import { Nude__factory } from "../../typechain/factories/Nude__factory";

const JoinDapContainer = styled.div`
	height: 100%;
	width: 100%;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;


const JoinButton = styled.button`
    font-family: Poppins, Open Sans;
    height: 60px;
	width: 200px;
    font-family: Poppins,Open Sans;
    font-size: 16px;
    background-color: #FF81EB;
    color: white;
    border: none;
    padding: 5px 15px;
    border-radius: 25px;
    box-shadow: 0 3px 6px rgb(0 0 0 / 16%), 0 3px 6px rgb(0 0 0 / 23%);
    cursor: pointer;
`;


export default function JoinDao() {
    const { provider, signer, address, maticBalance } = useWallet();
    const handleJoinDao = useCallback(async () => {
        const nudeContract = Nude__factory.connect(
            process.env.NUDE_ADDRESS,
            provider
        );
        const nudeWithSigner = nudeContract.connect(signer);
        const tx = await nudeWithSigner.delegate(address);
        console.log(tx);
    }, [address, provider, signer]);
    return <JoinDapContainer>
        <JoinButton onClick={handleJoinDao} disabled={maticBalance?.eq(0)}>JOIN DAO NOW!</JoinButton>
        {maticBalance?.eq(0) && <p style={{color: "red"}}>You need have NUDE token to join DAO</p>}
    </JoinDapContainer>;
}