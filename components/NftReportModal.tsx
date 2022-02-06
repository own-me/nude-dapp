import React, { memo, useState } from "react";
import styled from "styled-components";
import { shortenAddress } from "../lib/helpers";
import { NftInterface, usePostNftReportMutation } from "../redux/api/nft";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleReportModal } from "../redux/slices/app";
import FormCheckboxInput from "./FormCheckboxInput";
import FormTextArea from "./FormTextArea";
import Modal from "./Modal";

const Header = styled.h1`
    font-family: "Poppins", sans-serif;
    padding: 0px 40px 20px 40px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 0px;
`;

const ModalContent = styled.div`
    padding: 30px;
`;

const SubmitButton = styled.button<{ $disabled?: boolean }>`
    font-family: Poppins, Open Sans;
    font-size: 22px;
    background-color: ${props => props.$disabled ? "#a3a3a3" : "#FE4848"};
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: 6px;
    box-shadow: 0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23);
    cursor: ${props => props.$disabled ? "not-allowed" : "pointer"};
    width: 80%;
    align-self: flex-end;
    opacity: ${props => props.$disabled ? 0.8 : 1};

    :hover {
        background-color: ${props => props.$disabled ? "#8a8a8a" : "#fa2a2a"};
    }
`;

const FormContainer = styled.div`
`;

const NftInfoContainer = styled.div`
    display: flex;
    align-items: flex-start;
    font-family: Poppins, Open Sans;
    width: 100%;
`;

const NftImage = styled.img`
    width: 300px;
    height: 300px;
    object-fit: cover;
    border-radius: 5px;
`;

const NftInfo = styled.div`
    width: 100%;
    height: 100%;
    padding-left: 20px;
`;

const NftTitle = styled.div`
    font-size: 25px;
`;

const NftOwner = styled.div`

`;

const FormFooter = styled.div`
    display: flex;
    justify-content: center;
`;

const ResponseContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 50px 0px;
    font-size: 25px;
    font-family: Poppins, Open Sans;
`;

interface NftReportModalProps {
    nft?: NftInterface;
}

const NftReportModal = memo(({ nft }: NftReportModalProps) => {
    const dispatch = useAppDispatch();
    const isReportModalOpen = useAppSelector(state => state.app.isReportModalOpen);

    const [reason, setReason] = useState<string>("");
    const [confirmation, setConfirmation] = useState<boolean>(false);

    const [postNftReport, {
        isSuccess: isNftReportSuccess,
    }] = usePostNftReportMutation();

    const submitConditions = reason && confirmation;

    const handleSubmitReport = () => {
        if (submitConditions) {
            postNftReport({ tokenId: nft.tokenId, reason });
        }
    };

    return (
        <Modal isOpen={isReportModalOpen} onClose={() => dispatch(toggleReportModal())}>
            <Header>Report NFT</Header>
            <ModalContent>
                <NftInfoContainer>
                    <NftImage src={nft.tokenURI.image} />
                    <NftInfo>
                        <NftTitle>{nft.tokenURI.title}</NftTitle>
                        <NftOwner>{shortenAddress(nft.recipient, 18)}</NftOwner>
                    </NftInfo>
                </NftInfoContainer>
                {
                    !isNftReportSuccess ? (
                        <FormContainer>
                            <FormTextArea
                                label="Reason for Report"
                                onChange={(value) => setReason(value)}
                                errorMessage="Reason is required."
                                placeHolder="Please explain why you are reporting this NFT..."
                            />
                            <br />
                            <FormCheckboxInput
                                label="I verify my report is valid and represents a fair complaint. I accept that if I am an idiot spammer abusing this report system, my Own Me account may be terminated."
                                onChecked={(checked) => setConfirmation(checked)}
                            />
                            <br />
                            <br />
                            <FormFooter>
                                <SubmitButton onClick={handleSubmitReport} $disabled={!submitConditions}>Submit Report</SubmitButton>
                            </FormFooter>
                        </FormContainer>
                    ) : (
                        <ResponseContainer>
                            <p>Thank you for your report!</p>
                        </ResponseContainer>
                    )
                }
            </ModalContent>
        </Modal>
    );
});

export default NftReportModal;