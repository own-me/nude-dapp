import React, { memo } from "react";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { toggleReportModal } from "../redux/slices/app";
import Modal from "./Modal";

const ReportModal = memo(() => {
    const dispatch = useAppDispatch();
    const isReportModalOpen = useAppSelector(state => state.app.isReportModalOpen);

    return (
        <Modal isOpen={isReportModalOpen} onClose={() => dispatch(toggleReportModal())}>
            <p>Report</p>
        </Modal>
    );
});

export default ReportModal;