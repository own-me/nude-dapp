import React, { useCallback, useState } from "react";
import useWallet from "../../hooks/useWallet";
import { NudeDEX__factory, NudeGovernor__factory } from "../../typechain";
import FormInput from "../../components/form/FormInput";
import FormTextArea from "../../components/form/FormTextArea";
import {SubmitButton}from "../mint/MintPage";
import {Wrapper} from "./ProposalList";


interface CreateProposalProps {
	submitCallback: () => void;
}

export default function CreateProposal({ submitCallback }: CreateProposalProps) {
    const { provider, signer } = useWallet();
    const [tax, setTax] = useState("");
    const [desc, setDesc] = useState("");

    const createProposal = useCallback(async () => {
        const nudeDexContract = NudeDEX__factory.connect(
            process.env.NUDE_DEX_ADDRESS,
            provider
        );
        const target = nudeDexContract.interface.encodeFunctionData("setTax", [tax]);
        const nudeGovernorContract = NudeGovernor__factory.connect(
            process.env.NUDE_GOVERNOR_ADDRESS,
            provider
        );
        const nudeGovernorWithSigner = nudeGovernorContract.connect(signer);
        const txRes = await nudeGovernorWithSigner.propose(
            [process.env.NUDE_DEX_ADDRESS],
            [0],
            [target],
            desc
        );
        console.log(txRes);
        submitCallback();
    }, [provider, tax, signer, desc, submitCallback]);

    return <Wrapper>
        <FormInput type="text" label="NEW TAX" onChange={(e) => setTax(e.target.value)} value={tax} errorMessage="tax amount is required"/>
        <FormTextArea
            label="Description"
            onChange={(value) => setDesc(value)}
            errorMessage="Description is required."
        />
        <SubmitButton onClick={createProposal}>SUBMIT</SubmitButton>
    </Wrapper>;
}