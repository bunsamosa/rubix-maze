import { css, Global } from '@emotion/core';
import React, { useEffect } from 'react';
import Modal from 'react-modal';
import { useMoralis } from 'react-moralis';
import AssetLoader from './@core/AssetLoader';
import Game from './@core/Game';
import Scene from './@core/Scene';
import SceneManager from './@core/SceneManager';
import useWindowSize from './@core/useWindowSize';
import GenericScene from './scenes/GenericScene';
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
    landingPage: {
        backgroundColor: 'white',
        height: '100rem',
        display: 'flex',
        flexDirection: 'row' as const,
        justifyContent: 'center',
        gap: '8rem',
    },
    button: {
        backgroundColor: '#C4A484',
        height: '3rem',
        width: '10rem',
        borderRadius: '10px',
        textAlign: 'center' as const,
        fontWeight: 'bold' as const,
        fontSize: '1.5rem',
        cursor: 'pointer' as const,
    },
    divAlign: {
        display: 'flex',
        flexDirection: 'column' as const,
        marginLeft: '2rem',
        marginRight: '-2rem',
    },
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
    closeButton: {
        backgroundColor: 'red',
        color: 'white',
        fontSize: '1rem',
        border: 'none',
        cursor: 'pointer',
        width: '5rem',
        height: '2rem',
        borderRadius: '5px'
    },
    modalButtons: {
        backgroundColor: 'green',
        color: 'white',
        fontSize: '1rem',
        border: 'none',
        cursor: 'pointer',
        width: '5rem',
        height: '2rem',
        borderRadius: '5px'
    },
    buttonDiv: {
        display: 'flex',
        flexDirection: 'row' as const,
        gap: '1rem',
        marginTop: '1rem',
    },
    textArea: {
        width: '100%',
        height: '10rem',
    },
    textAreaAlign: {
        marginTop: '1rem',
    },
    h1Syle: {
        fontSize: '70px',
        color: 'black',
        marginTop: '120%'
    },
    h2Syle: {
        fontSize: '30px',
        color: 'black',
        marginTop: '-10%'
    },
    landingLogo: {
        height: '60%',
    }
};

const urls = [
    ...Object.values(spriteData).map(data => data.src),
    ...Object.values(soundData).map(data => data.src),
    // flatten
].reduce<string[]>((acc, val) => acc.concat(val), []);

const placesData = {
    "places": [
        {
            "name": "Truffles",
            "place_id": "ChIJWXKnRHkWrjsRh3kh6fY55pg",
            "lat": 12.9718226,
            "lng": 77.6008918,
            "rating": 4.5,
            "tags": [
                "cafe",
                "restaurant",
                "food",
                "point_of_interest",
                "establishment"
            ],
            "vicinity": "22, St Mark's Rd, Shanthala Nagar, Ashok Nagar, Bengaluru",
            "location_name": "MG Road",
            "best_time": "11 AM",
            "best_travel_option": "Metro"
        }
    ]
}

// map data for game UI
const mapStrings = {
    'home': `
# # # # # # # # # # # # #
# T · · W T · W · · · T #
· · · · · · · · · · · o ·
# · · · # # # # · · # # #
# · · · # W o W · · T W #
# · · · T · · · · · · · #
# · · · · · · · · · · o #
# # # # # # # # # # # # #
`,
    'cafe': `
# # # # # # # # # # # # #
# C C · · · T T · · · C #
· · · · W · · · · · · · ·
# W · # · · T T · · W · #
# W · # · · W # W · W · #
# · · · · · · · · · · · #
# C C C C C C C C C C C #
# # # # # # # # # # # # #
`,
    'library': `
# # # # # # # # # # # # #
# S · · · · · · · · · C #
· · · # S · · · · · · · ·
# S · # S · · · · · · · #
# S · # S S S · · · · · #
# S · · · · S · · · · · #
# S S S S S S · W W W W #
# # # # # # # # # # # # #
`,
    'park': `
# # T T T T T T T T T T T
# · · · · · · T T T T T #
· · · · · T · · · · · · ·
# · T # · · · · · · · · #
T · T # # · · T · · · · #
T · T T T · · T · · T T #
T · · · · · · T · · T T #
# # # # # # # # # # # # #
`
}


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

    // Modal changes
    let subtitle;
    const [modalIsOpen, setIsOpen] = React.useState(false);

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = 'black';
    }

    function closeModal() {
        setIsOpen(false);
    }

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
            <div style={styles.divAlign}>
                <button type="button" onClick={logOut} disabled={isAuthenticating} style={styles.button}>
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
                        <h2 ref={(_subtitle) => { subtitle = _subtitle }}>Add You Wiki Here!</h2>
                        <button type="button" onClick={closeModal} style={styles.closeButton}>close</button>
                        <form>
                            <div contentEditable='true' style={styles.textAreaAlign}>
                                <textarea style={styles.textArea} placeholder='Type your wiki here...' />
                            </div>
                            <div style={styles.buttonDiv}>
                                <button type="button" style={styles.modalButtons}>Save</button>
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
