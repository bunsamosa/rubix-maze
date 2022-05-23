import { Global } from '@emotion/core';
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useMoralis } from 'react-moralis';
import { styles } from './app/Styles';
import { ipfsHash, ipfsGateway } from './app/ipfsData';
import AssetLoader from './@core/AssetLoader';
import Game from './@core/Game';
import Scene from './@core/Scene';
import SceneManager from './@core/SceneManager';
import useWindowSize from './@core/useWindowSize';
import GenericScene from './scenes/GenericScene';
import { mapStrings } from './scenes/MapStrings'
import soundData from './soundData';
import spriteData from './spriteData';
import globalStyles from './styles/global';

const urls = [
    ...Object.values(spriteData).map(data => data.src),
    ...Object.values(soundData).map(data => data.src),
    // flatten
].reduce<string[]>((acc, val) => acc.concat(val), []);

let placesData = {};
let dataFetched = false;
let defaultPlace = {
    "name": "Department of Archaeology and Museums",
    "place_id": "ChIJqyoigt8VrjsRruQyccBZzHI",
    "lat": 12.97465,
    "lng": 77.5958911,
    "rating": 4.3,
    "tags": [
        "museum",
        "tourist_attraction",
        "point_of_interest",
        "establishment"
    ],
    "vicinity": "XHFW+V92, Venkatappa Art Gallery Building, Kasturba Road, Bengaluru",
    "location_name": "MG Road",
    "best_time": "3 PM",
    "best_travel_option": "Take an auto from Church Street"
};
let mapUrl = `https://www.google.com/maps/search/?api=1&query=${defaultPlace.lat}%2C${defaultPlace.lng}`;

export default function App() {
    // find width and height
    const [width, height] = useWindowSize();

    // initialize moralis sdk
    const {
        Moralis,
        authenticate,
        isAuthenticated,
        isAuthenticating,
        account,
        logout,
    } = useMoralis();

    // Modal changes
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        const keys = Object.keys(placesData);
        const randIndex = Math.floor(Math.random() * keys.length);
        const randKey = keys[randIndex];
        defaultPlace = placesData[randKey];
        mapUrl = `https://www.google.com/maps/search/?api=1&query=${defaultPlace.lat}%2C${defaultPlace.lng}`;
        console.log(defaultPlace);
        setIsOpen(true);
    };

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'black';
    };

    function closeModal() {
        setIsOpen(false);
    };

    const readData = async () => {
        const url = `${ipfsGateway}${ipfsHash}`;
        console.log(url);
        const response = await fetch(url);
        placesData = await response.json();
        console.log(placesData);
        dataFetched = true;
        return placesData;
    };

    useEffect(() => {
        if (isAuthenticated) {
            // fetch places data
            readData();
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
    const appLogOut = async () => {
        await logout();
        console.log('logged out');
    };

    // save data to IPFS
    const saveData = async () => {
        if (dataFetched) {
            const file = new Moralis.File("rubix_places.json", {
                base64: btoa(JSON.stringify(placesData)),
            });
            await file.saveIPFS();
            console.log(file.toJSON());
        }
    };

    // user connected - return game and logout button
    const renderConnectedContainer = () => (
        <div css={styles.root(width, height)}>
            <div style={styles.divAlign}>
                <button type="button" onClick={appLogOut} disabled={isAuthenticating} style={styles.button}>
                    Logout
                </button>
                <div>
                    <button type="button" onClick={openModal} style={styles.button}>Wiki</button>
                    <Modal
                        isOpen={modalIsOpen}
                        onAfterOpen={afterOpenModal}
                        onRequestClose={closeModal}
                        style={styles.content}
                        contentLabel="Wiki Modal"
                    >
                        <h2 ref={(_subtitle) => { subtitle = _subtitle }}>Welcome to {defaultPlace.name}!</h2>
                        <p style={styles.text}>Attraction: {defaultPlace.tags[0]}</p>
                        <a href={mapUrl} target="_blank" rel="noopener noreferrer">Location</a>
                        <p style={styles.text}>Best time to reach: {defaultPlace.best_time}</p>
                        <p style={styles.text}>Best way to reach: {defaultPlace.best_travel_option}</p>
                        <button type="button" onClick={closeModal} style={styles.closeButton}>close</button>
                        <form>
                            <div contentEditable='true' style={styles.textAreaAlign}>
                                <textarea style={styles.textArea} placeholder='Add additional details here' />
                            </div>
                            <div style={styles.buttonDiv}>
                                <button type="button" style={styles.modalButtons} onClick={saveData}>Save</button>
                                <button type="button" style={styles.modalButtons}>Edit</button>
                                <button type="button" style={styles.closeButton}>Delete</button>
                            </div>
                        </form>
                    </Modal>
                </div>
                <button type="button" style={styles.button}>
                    Host
                </button>
                <button type="button" style={styles.button}>
                    Conquer
                </button>
            </div>
            <Game cameraZoom={80}>
                <AssetLoader urls={urls} placeholder="Loading assets ...">
                    <SceneManager defaultScene="home">
                        <Scene id="library">
                            <GenericScene mapString={mapStrings.library} inTarget="cafe/exit" outTarget="home/start" />
                        </Scene>
                        <Scene id="home">
                            <GenericScene mapString={mapStrings.home} inTarget="library/exit" outTarget="park/start" />
                        </Scene>
                        <Scene id="park">
                            <GenericScene mapString={mapStrings.park} inTarget="home/exit" outTarget="cafe/start" />
                        </Scene>
                        <Scene id="cafe">
                            <GenericScene mapString={mapStrings.cafe} inTarget="park/exit" outTarget="library/start" />
                        </Scene>
                    </SceneManager>
                </AssetLoader>
            </Game>
        </div>
    );

    // user not connected - return login button
    const renderNotConnectedContainer = () => (
        <div style={styles.landingPage}>
            <div>
                <h1 style={styles.h1Syle}>The Maze</h1>
                <h2 style={styles.h2Syle}>Explore - Host- Conquer</h2>
                <button type="button" onClick={login} style={styles.modalButtons}>
                    Login
                </button>
            </div>
            <div>
                <img {...spriteData.logo} alt="logo" style={styles.landingLogo} />
            </div>
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
