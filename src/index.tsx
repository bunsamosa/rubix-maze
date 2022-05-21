import React from 'react';
import ReactDOM from 'react-dom';
import { MoralisProvider } from 'react-moralis';
import App from './App';

ReactDOM.render(
    <React.StrictMode>
        <MoralisProvider
            serverUrl="https://pjsctz5bkqjc.usemoralis.com:2053/server"
            appId="TBgozxOyrhwNWSqwPv6bKw0ZDb2PsH52d7GxEHRm"
        >
            <App />
        </MoralisProvider>
    </React.StrictMode>,
    document.getElementById('root')
);

type RequestIdleCallbackHandle = any;
type RequestIdleCallbackOptions = {
    timeout: number;
};
type RequestIdleCallbackDeadline = {
    readonly didTimeout: boolean;
    timeRemaining: () => number;
};

declare global {
    interface Window {
        requestIdleCallback: (
            callback: (deadline: RequestIdleCallbackDeadline) => void,
            opts?: RequestIdleCallbackOptions
        ) => RequestIdleCallbackHandle;
        cancelIdleCallback: (handle: RequestIdleCallbackHandle) => void;
    }
}
