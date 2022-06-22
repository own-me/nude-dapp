import React, { useEffect, useState } from "react";
import { Nude__factory } from "../../typechain/factories/Nude__factory";
import useWallet from "../../hooks/useWallet";
import JoinDao from "./JoinDao";
import ProposalList from "./ProposalList";

export default function DaoPage() {
    const { provider, signer, address } = useWallet();
    const [hasJoined, setHasJoined] = useState(false);

    useEffect(() => {
        const getDelegateInfo = async () => {
            const nudeContract = Nude__factory.connect(
                process.env.NUDE_ADDRESS,
                provider
            );
            const nudeWithSigner = nudeContract.connect(signer);
            const delegateAddress = await nudeWithSigner.delegates(address);
            setHasJoined(delegateAddress === address);
        };
        getDelegateInfo();
    }, [address, provider, signer]);

    return hasJoined ?  <ProposalList /> : <JoinDao />;
}