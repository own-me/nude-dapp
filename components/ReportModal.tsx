import React, { memo } from "react";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleReportModal } from "../redux/slices/app";
import Modal from "./Modal";

const Header = styled.h1`
    font-family: "Poppins", sans-serif;
    padding: 0px 40px 20px 40px;
    border-bottom: 1px solid #e0e0e0;
    margin-bottom: 0px;
`;

const ReportModal = memo(() => {
    const dispatch = useAppDispatch();
    const isReportModalOpen = useAppSelector(state => state.app.isReportModalOpen);

    return (
        <Modal isOpen={isReportModalOpen} onClose={() => dispatch(toggleReportModal())}>
            <Header>Report</Header>
        </Modal>
    );
});

export default ReportModal;