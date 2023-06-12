import { useRoutes, Navigate, } from 'react-router-dom'
import * as anchor from "@project-serum/anchor";
import { DEFAULT_TIMEOUT } from "./connection";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";


// PAGE COMPONENTS
import Contribution from './Comps/Contribution/Contribution';
import ProjectTracking from './Comps/ProjectTracking/ProjectTracking';
import Footprint from './Comps/Footprint/Footprint';
import Offset from './Comps/Offset/Offset';
import MRV from './Comps/MRV/MRV';
import LoginPage from './Comps/LoginPage/LoginPage';
import ListedLands from './Comps/ListedLands/ListedLands';
import AddLands from './Comps/AddLands/AddLands';
import Profile from './Comps/Profile/Profile';
import Home from './Comps/Home/Home';
import Pagenotfound from './Comps/PagenotFound/Pagenotfound';



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

    const UserAuth: string | null = localStorage.getItem('UserAuth') ?? ''



    return useRoutes([
        {
            path: `*`,
            element: <Pagenotfound />
        },
        {
            path: startUrl,
            element: <LoginPage />
        },
        {
            path: `${startUrl}home`,
            element: UserAuth === 'true' ? (
                <Home
                    candyMachineId={candyMachineId}
                    connection={connection}
                    txTimeout={DEFAULT_TIMEOUT}
                    rpcHost={rpcHost}
                    network={network}
                    error={error}
                />
            ) : (
                <Navigate to={startUrl} />
            ),
        },
        {
            path: 'contribution',
            element: <Contribution />,
        },
        {
            path: 'trackproject',
            element: <ProjectTracking />,
        },
        {
            path: 'footprint',
            element: <Footprint />,
        },
        {
            path: 'offset',
            element: <Offset />,
        },
        {
            path: 'mrv',
            element: <MRV />,
        },

        {
            path: 'listedlands',
            element: <ListedLands />,
        },
        {
        path: 'addyourlands',
            element: <AddLands />,
        },
        {
        path: 'profile',
        element: <Profile />,
        },

    ]);
}

export default Routes