import { css, Global } from '@emotion/core';
import React, { useEffect, useState } from 'react';
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

const TEST_GIFS = [
    'https://i.giphy.com/media/eIG0HfouRQJQr1wBzz/giphy.webp',
    'https://media3.giphy.com/media/L71a8LW2UrKwPaWNYM/giphy.gif?cid=ecf05e47rr9qizx2msjucl1xyvuu47d7kf25tqt2lvo024uo&rid=giphy.gif&ct=g',
    'https://media4.giphy.com/media/AeFmQjHMtEySooOc8K/giphy.gif?cid=ecf05e47qdzhdma2y3ugn32lkgi972z9mpfzocjj6z1ro4ec&rid=giphy.gif&ct=g',
    'https://i.giphy.com/media/PAqjdPkJLDsmBRSYUp/giphy.webp',
];

const styles = {
    root: (width: number, height: number) => css`
        display: flex;
        width: ${width - (width % 2)}px;
        height: ${height - (height % 2)}px;
        justify-content: center;
        align-items: center;
    `,
    buttonStyles: css`
        position: absolute;
        top: 700px;
        left: 60%;
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
    const [gifList, setGifList] = useState([]);

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

    const sendGif = async () => {
        if (inputValue.length > 0) {
            console.log('Gif link:', inputValue);
            setGifList([...gifList, inputValue]);
            setInputValue('');
        } else {
            console.log('Empty input. Try again.');
        }
    };

    const onInputChange = event => {
        const { value } = event.target;
        setInputValue(value);
    };

    // const buttonStyles = {
    //     position: 'absolute',
    //     top: '700px',
    //     left: '60%',
    // };

    const renderConnectedContainer = () => (
        <div className="connected-container">
            {/* <form
                onSubmit={event => {
                    event.preventDefault();
                    sendGif();
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
            <form css={styles.buttonStyles}>
                <button type="submit" className="game-btn">
                    Wiki
                </button>
                <button type="submit" className="game-btn">
                    Host
                </button>
                <button type="submit" className="game-btn">
                    Conquer
                </button>
            </form>
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
            console.log('Fetching GIF list...');

            // Call Solana program here.

            // Set state
            setGifList(TEST_GIFS);
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
