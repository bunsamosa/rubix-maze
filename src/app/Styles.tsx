import { css } from '@emotion/core';

export const styles = {
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
