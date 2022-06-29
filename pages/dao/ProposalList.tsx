import React, { useCallback, useState } from "react";
import CreateProposal from "./CreateProposal";
import styled from "styled-components";
import { ProposalInterface, useGetListQuery } from "../../api/proposals";
import { SubmitButton } from "../mint/MintPage";
import xIcon from "../../media/icons/x.svg";

const AGAINST = 0;
const APPROVE = 1;
const ABSTAIN = 2;

export const Wrapper = styled.div`
	width: 80%;
	height: 100%;
    overflow-y: auto;
	margin: 0 auto;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`;

const ButtonWrapper = styled.div`
    position: fixed;
    right: 40px;
    bottom: 40px;
`;

export const ProposalItem = styled.div`
    border: 1px solid pink;
    border-radius: 5px;
    width: 70%;
    height: 30px;
    line-height: 30px;
    padding: 4px 12px;
    cursor: pointer;
`;

const ProposalDetail = styled.div<{ $in: boolean }>`
    opacity: ${props => props.$in ? "1" : "0"};
    transition: opacity 400ms ease-in-out;
    position: fixed;
    top: 40px;
    bottom: 40px;
    left: 120px;
    right: 120px;
    background: #efefef;
    z-index: ${props => props.$in ? 10 : -10};
    padding: 5% 10%;
    font-size: 2rem;
    border-radius: 1rem;
`;

const CloseIcon = styled.img`
    float: right;
    margin-left: 24px;
    margin-bottom: 12px;
    cursor: pointer;
    height: 25px;

    :hover {
        transform: scale(1.1);
    }
`;

const VoteButtonWrapper = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 20px;
`;

export default function ProposalList() {
    const [makingProposal, setMakingProposal] = useState(false);
    const [viewingProposal, setViewingProposal] = useState<ProposalInterface>(null);
    const {
        data: proposalsListData,
        isLoading: isProposalsListLoading,
    } = useGetListQuery({ query: "*", page: 0 });

    const vote = useCallback((value: number) => {console.log(value);}, []); // todo: need implement

    return makingProposal
        ? <CreateProposal submitCallback={() => setMakingProposal(false)} />
        : <><Wrapper>{
            proposalsListData?.proposals?.map((proposal) => <ProposalItem key={proposal.proposalId} onClick={() => setViewingProposal(proposal)}>{proposal.description}</ProposalItem>)
        }</Wrapper>;
        <ButtonWrapper>
            <SubmitButton onClick={() => setMakingProposal(true)}>CREATE PROPOSAL</SubmitButton>
        </ButtonWrapper>
        {/* TODO: use modal instead of this simple detail component */}
        <ProposalDetail $in={viewingProposal !== null}>
            {viewingProposal?.description}
            <CloseIcon onClick={() => setViewingProposal(null)} src={xIcon} />
            <VoteButtonWrapper>
                <SubmitButton onClick={() => vote(APPROVE)}>APPROVE</SubmitButton>
                <SubmitButton onClick={() => vote(AGAINST)}>AGAINST</SubmitButton>
                <SubmitButton onClick={() => vote(ABSTAIN)}>ABSTAIN</SubmitButton>
            </VoteButtonWrapper>
        </ProposalDetail>
        </>;

}
