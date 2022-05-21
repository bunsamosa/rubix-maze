import { css, Global } from '@emotion/core';
import React, { useEffect } from 'react';
import { useMoralis } from 'react-moralis';
import AssetLoader from './@core/AssetLoader';
import Game from './@core/Game';
import Scene from './@core/Scene';
import SceneManager from './@core/SceneManager';
import useWindowSize from './@core/useWindowSize';
import OfficeScene from './scenes/OfficeScene';
import OtherScene from './scenes/OtherScene';
import soundData from './soundData';
import spriteData from './spriteData';
import globalStyles from './styles/global';

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

export default function App() {
    // find width and height
    const [width, height] = useWindowSize();

    // initialize moralis sdk
    const {
        authenticate,
        isAuthenticated,
        isAuthenticating,
        account,
        logout,
    } = useMoralis();

    useEffect(() => {
        if (isAuthenticated) {
            // add further logic here
            // fetch game map
        }
    }, [isAuthenticated]);

    // login button call
    const login = async () => {
        if (!isAuthenticated) {
            await authenticate({ signingMessage: 'Log in using Moralis' })
                .then(function (user) {
                    console.log('logged in user:', user);
                    console.log(user!.get('ethAddress'));
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    };

    // logout button call
    const logOut = async () => {
        await logout();
        console.log('logged out');
    };

    // user connected - return game and logout button
    const renderConnectedContainer = () => (
        <div css={styles.root(width, height)}>
            <p>
                <button type="button" onClick={logOut} disabled={isAuthenticating}>
                    Logout
                </button>
            </p>
            <Game cameraZoom={80}>
                <AssetLoader urls={urls} placeholder="Loading assets ...">
                    <SceneManager defaultScene="office">
                        <Scene id="office">
                            <OfficeScene />
                        </Scene>
                        <Scene id="other">
                            <OtherScene />
                        </Scene>
                    </SceneManager>
                </AssetLoader>
            </Game>
        </div>
    );

    // user not connected - return login button
    const renderNotConnectedContainer = () => (
        <div>
            <button type="button" onClick={login}>
                Login
            </button>
        </div>
    );

    return (
        <>
            <Global styles={globalStyles} />
            <p>
                {isAuthenticated && renderConnectedContainer()}
                {!isAuthenticated && renderNotConnectedContainer()}
            </p>


        </>
    );
}
