import { useRoutes } from 'react-router-dom'
import DesktopComponent2 from './Comps/Desktop2/DesktopComponent2';
import DesktopComponent3 from './Comps/Desktop3/DesktopComponent3';
import DesktopComponent4 from './Comps/Desktop4/DesktopComponent4';
import DesktopComponent5 from './Comps/Desktop5/DesktopComponent5';
import DesktopComponent6 from './Comps/Desktop6/DesktopComponent6';
import * as anchor from "@project-serum/anchor";
import { DEFAULT_TIMEOUT } from "./connection";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import Home from './Comps/Home/Home';
import Pagenotfound from './Comps/Pagenotfound';


//this variable is for local development 
export const startUrl = `/`;


const getCandyMachineId = (): anchor.web3.PublicKey | undefined => {
    try {
        return new anchor.web3.PublicKey(process.env.REACT_APP_CANDY_MACHINE_ID!);
    } catch (e) {
        console.log("Failed to construct CandyMachineId", e);
        return undefined;
    }
};

let error: string | undefined = undefined;

if (process.env.REACT_APP_SOLANA_NETWORK === undefined) {
    error =
        "Your REACT_APP_SOLANA_NETWORK value in the .env file doesn't look right! The options are devnet and mainnet-beta!";
} else if (process.env.REACT_APP_SOLANA_RPC_HOST === undefined) {
    error =
        "Your REACT_APP_SOLANA_RPC_HOST value in the .env file doesn't look right! Make sure you enter it in as a plain-text url (i.e., https://metaplex.devnet.rpcpool.com/)";
}

const candyMachineId = getCandyMachineId();
const network = (process.env.REACT_APP_SOLANA_NETWORK ??
    "devnet") as WalletAdapterNetwork;
const rpcHost =
    process.env.REACT_APP_SOLANA_RPC_HOST ?? anchor.web3.clusterApiUrl("devnet");
const connection = new anchor.web3.Connection(rpcHost);


function Routes() {

    



    return useRoutes([
        {
            path: `*`,
            element: <Pagenotfound />
        },
        {
            path: startUrl,
            element: <Home
                candyMachineId={candyMachineId}
                connection={connection}
                txTimeout={DEFAULT_TIMEOUT}
                rpcHost={rpcHost}
                network={network}
                error={error}
            />,
        },
        {
            path: 'desktop2',
            element: <DesktopComponent2 />,
        },
        {
                    path: 'desktop4',
            element: <DesktopComponent3 />,
        },
        {
                    path: 'desktop3',
            element: <DesktopComponent4 />,
        },
        {
                    path: 'desktop5',
            element: <DesktopComponent5 />,
        },
        {
            path: 'desktop6',
            element: <DesktopComponent6 />,
        },
    ])
}

export default Routes