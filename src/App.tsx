import { css, Global } from '@emotion/core';
import React, { useEffect, useState } from 'react';
import { Connection, PublicKey, clusterApiUrl, Commitment } from '@solana/web3.js';
import * as web3 from '@solana/web3.js';
import { Program, Provider } from '@project-serum/anchor';
import AssetLoader from './@core/AssetLoader';
import Game from './@core/Game';
import Scene from './@core/Scene';
import SceneManager from './@core/SceneManager';
import useWindowSize from './@core/useWindowSize';
import OfficeScene from './scenes/OfficeScene';
import OtherScene from './scenes/OtherScene';
import TestScene from './scenes/TestScene';
import soundData from './soundData';
import spriteData from './spriteData';
import globalStyles from './styles/global';
const idl = require('./idl.json');

// SystemProgram is a reference to the Solana runtime!
const { SystemProgram, Keypair } = web3;

// Create a keypair for the account that will hold the location data.
const baseAccount = Keypair.generate();

// Get our program's id from the IDL file.
const programID = new PublicKey('Axs3RYZwZf1AKVVsAJrLmP9NbSuUPEEgjyxZRnUE8SvC');

// Set our network to devnet.
const network = clusterApiUrl('devnet');

// Controls how we want to acknowledge when a transaction is "done".
const opts = {
    // preflightCommitment: "processed" as Commitment,
    preflightCommitment: 'processed' as Commitment,
};

// const lastopts = {
//     preflightCommitment: 'processed',
//     commitment: 'processed'
// }

const styles = {
    root: (width: number, height: number) => css`
        display: flex;
        width: ${width - (width % 2)}px;
        height: ${height - (height % 2)}px;
        justify-content: center;
        align-items: center;
    `,
};

const urls = [
    ...Object.values(spriteData).map(data => data.src),
    ...Object.values(soundData).map(data => data.src),
    // flatten
].reduce<string[]>((acc, val) => acc.concat(val), []);

declare global {
    interface Window {
        solana: any;
    }
}

export default function App() {
    const [width, height] = useWindowSize();
    // State
    const [walletAddress, setWalletAddress] = useState(null);
    const [inputValue, setInputValue] = useState('');
    const [locations, setLocations] = useState([]);

    // Actions

    const checkIfWalletIsConnected = async () => {
        try {
            const { solana } = window;

            if (solana) {
                if (solana.isPhantom) {
                    console.log('Phantom wallet found!');
                    const response = await solana.connect({ onlyIfTrusted: true });
                    console.log(
                        'Connected with Public Key:',
                        response.publicKey.toString()
                    );

                    /*
                     * Set the user's publicKey in state to be used later!
                     */
                    setWalletAddress(response.publicKey.toString());
                }
            } else {
                alert('Solana object not found! Get a Phantom Wallet 👻');
            }
        } catch (error) {
            console.error(error);
        }
    };
    const connectWallet = async () => {
        const { solana } = window;

        if (solana) {
            const response = await solana.connect();
            console.log('Connected with Public Key:', response.publicKey.toString());
            setWalletAddress(response.publicKey.toString());
        }
    };

    const updatedata = async () => {
        console.log(inputValue);
        setLocations(JSON.parse(inputValue));
    };

    const onInputChange = event => {
        const { value } = event.target;
        setInputValue(value);
    };

    const getProvider = () => {
        const connection = new Connection(network, opts.preflightCommitment);
        const provider = new Provider(connection, window.solana, opts);
        return provider;
    };

    const renderConnectedContainer = () => (
        <div className="connected-container">
            {/* <form
                onSubmit={event => {
                    event.preventDefault();
                    updatedata();
                }}
            >
                <input
                    type="text"
                    placeholder="Enter gif link!"
                    value={inputValue}
                    onChange={onInputChange}
                />
                <button type="submit" className="cta-button submit-gif-button">
                    Submit
                </button>
            </form> */}
            <div css={styles.root(width, height)}>
                <Game cameraZoom={80}>
                    <AssetLoader urls={urls} placeholder="Loading assets ...">
                        <SceneManager defaultScene="office">
                            <Scene id="office">
                                <OfficeScene />
                            </Scene>
                            <Scene id="other">
                                <OtherScene />
                            </Scene>
                            <Scene id="test">
                                <TestScene />
                            </Scene>
                        </SceneManager>
                    </AssetLoader>
                </Game>
            </div>
        </div>
    );

    const renderNotConnectedContainer = () => (
        <button
            className="cta-button connect-wallet-button"
            onClick={connectWallet}
            type="button"
        >
            Connect to Wallet
        </button>
    );

    const getLocations = async () => {
        try {
            const provider = getProvider();
            const program = new Program(idl, programID, provider);
            const account = await program.account.baseAccount.fetch(
                baseAccount.publicKey
            );
            setLocations(account.locations);
        } catch (error) {
            setLocations([]);
        }
    };

    // UseEffects
    useEffect(() => {
        const onLoad = async () => {
            await checkIfWalletIsConnected();
        };
        window.addEventListener('load', onLoad);
        return () => window.removeEventListener('load', onLoad);
    }, []);

    useEffect(() => {
        if (walletAddress) {
            console.log('Fetching location data');

            // Call Solana program here.
            updatedata();
        }
    }, [walletAddress]);

    return (
        <>
            <Global styles={globalStyles} />
            <p>
                {!walletAddress && renderNotConnectedContainer()};
                {/* We just need to add the inverse here! */};
                {walletAddress && renderConnectedContainer()};
            </p>
        </>
    );
}
