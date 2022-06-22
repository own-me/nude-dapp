import React, { useEffect, useState } from "react";
import useWallet from "../../hooks/useWallet";
import { NudeGovernor__factory } from "../../typechain";
import CreateProposal from "./CreateProposal";
import styled from "styled-components";

export const Wrapper = styled.div`
	width: 80%;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export default function ProposalList() {
    const [makingProposal, setMakingProposal] = useState(false);

    // useEffect(() => {
    // 	// todo: get list
    // }, []);

    return makingProposal
        ? <CreateProposal submitCallback={() => setMakingProposal(false)} />
        : <Wrapper>Working on getting list</Wrapper>;
}