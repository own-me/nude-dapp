import React, { useEffect, useState } from "react";
import CreateProposal from "./CreateProposal";
import styled from "styled-components";
import { useGetListQuery } from "../../api/proposals";

export const Wrapper = styled.div`
	width: 80%;
	height: 100%;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

export const ProposalItem = styled.div`
    border: 1px solid pink;
    border-radius: 5px;
    width: 70%;
    height: 30px;
    line-height: 30px;
`;

export default function ProposalList() {
    const [makingProposal, setMakingProposal] = useState(false);
    const {
        data: proposalsListData,
        isLoading: isProposalsListLoading,
    } = useGetListQuery({ query: "*", page: 0});

    return makingProposal
        ? <CreateProposal submitCallback={() => setMakingProposal(false)} />
        : <Wrapper>{
            proposalsListData?.proposals?.map((proposal) => <ProposalItem key={proposal.proposalId}>{proposal.description}</ProposalItem>)
        }</Wrapper>;
}
