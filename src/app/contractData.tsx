// contract ABI data
const ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "reward",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "addr",
                "type": "address"
            }
        ],
        "name": "get",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
]

// function call options to add reward
export const rewardFunction = {
    contractAddress: "0x69d33A63B775542AEE4cBc432AD990046D160a4d",
    abi: ABI,
    functionName: "reward",
    params: { addr: "" },
};

// function call options to get balance
export const balanceFunction = {
    contractAddress: "0x69d33A63B775542AEE4cBc432AD990046D160a4d",
    abi: ABI,
    functionName: "get",
    params: { addr: "" }
};
