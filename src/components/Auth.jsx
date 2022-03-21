import React  from 'react';
import { useMetaMask } from "metamask-react";

import Register from "./Register";

import './Auth.css'

function MetaButton() {
    const { status, connect, account, chainId, ethereum } = useMetaMask();

    if (status === "initializing") return <div>Synchronisation with MetaMask ongoing...</div>

    if (status === "unavailable") return <div>MetaMask not available :(</div>

    if (status === "notConnected") return <button onClick={connect}> Connect to MetaMask </button>

    if (status === "connecting") return <div>Connecting...</div>

    if (status === "connected") {
        // TODO check chainId
        return <Register />
    }

    return null;
}

export default function Auth() {
    return <div className="auth-card">
        <h1>Welcome to persistent decentralized twitter</h1>
        <div className="meta-button"><MetaButton/></div>
    </div>
}
