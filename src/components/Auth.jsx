import React  from 'react';
import { useMetaMask } from "metamask-react";

import Register from "./Register";

export default function Auth() {
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

    if (status === "unavailable") return <div>MetaMask not available :(</div>

    if (status === "notConnected") return <button onClick={connect}>Connect to MetaMask</button>

    if (status === "connecting") return <div>Connecting...</div>

    if (status === "connected") {
        // TODO check chainId
        return <Register />
    }

    return null;
}
