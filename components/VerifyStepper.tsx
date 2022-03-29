import React, { memo, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { createVeriffFrame } from "@veriff/incontext-sdk";
import Modal from "./Modal";
import FormInput from "./FormInput";
import { useCreateVerifySessionMutation } from "../api/verify";

const ModalContent = styled.div`
    padding: 30px;
    padding-top: 0px;
`;

const Header = styled.h1`
    font-family: "Poppins", sans-serif;
    padding: 0px 40px 20px 40px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 0px;
`;

const Message = styled.h4`
    font-family: "Poppins", sans-serif;
`;

const VerifyButton = styled.button<{ $disabled?: boolean }>`
    font-family: Poppins, Open Sans;
    font-size: 30px;
    background-color: ${props => props.$disabled ? "#a3a3a3" : "#FF81EB"};
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    cursor: ${props => props.$disabled ? "not-allowed" : "pointer"};
    opacity: ${props => props.$disabled ? 0.8 : 1};
    width: 100%;
    align-self: flex-end;
    margin-top: 25px;

    :hover {
        background-color: ${props => props.$disabled ? "#8a8a8a" : "#fb5de1"};
    }
`;

interface VerifyStepperInterface {
    userAddress: string;
    onClose: () => void;
}

const VerifyStepper = memo(({ userAddress, onClose }: VerifyStepperInterface) => {
    const [firstName, setFirstName] = useState<string>(null);
    const [lastName, setLastName] = useState<string>(null);

    const [postCreateVerifySession, {
        isSuccess: isCreateVerifySessionSuccess,
        data: createVerifySessionData
    }] = useCreateVerifySessionMutation();

    const handleGetVerified = useCallback(() => {
        postCreateVerifySession({
            verification: {
                callback: "https://veriff.com",
                person: {
                    firstName,
                    lastName,
                    idNumber: userAddress
                },
                timestamp: "2016-05-19T08:30:25.597Z"
            }
        });
    }, [firstName, lastName, postCreateVerifySession, userAddress]);

    useEffect(() => {
        if (isCreateVerifySessionSuccess && createVerifySessionData?.verification?.url) {
            createVeriffFrame({ url: createVerifySessionData.verification.url });
        }
    }, [createVerifySessionData?.verification?.url, isCreateVerifySessionSuccess]);

    return (
        <Modal isOpen onClose={onClose}>
            <Header>Get Verified!</Header>
            <ModalContent>
                <Message>We use <a href="https://www.veriff.com/" target="_blank">Veriff</a> a 3rd party company that takes minimum required documents to prove you are of legal age to be an adult content creator.</Message>
                <Message>Either we do KYC or go to jail basically. Own Me Inc. would not be a functional company and we don't want underage creators.</Message>
                <Message>We do not store any of your documents, the 3rd party handles everything. We just store a receipt of the verification for legal bookkeeping.</Message>
                <hr />
                <FormInput
                    type="text"
                    label="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                    errorMessage="First Name is required."
                />
                <FormInput
                    type="text"
                    label="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                    errorMessage="Last Name is required."
                />
                <VerifyButton onClick={handleGetVerified} $disabled={!firstName || !lastName}>Get Verified</VerifyButton>
            </ModalContent>
        </Modal>
    );
});

export default VerifyStepper;
