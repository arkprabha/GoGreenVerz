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
import ListedLands from './Comps/ListedLands/ListedLands';
import AddLands from './Comps/AddLands/AddLands';
import Profile from './Comps/Profile/Profile';
import Home from './Comps/Home/Home';
import Pagenotfound from './Comps/PagenotFound/Pagenotfound';
import NewLoginPage from './Comps/LoginPage/NewLogin';
import SignUpForm from './Comps/SignUpAndForgotPass/SignupForm';
import ForgotPassword from './Comps/SignUpAndForgotPass/ForgotPassword';
import AdminProfileForm from './Comps/ProfileForms/AdminProfileForm';
import AfforestationForm from './Comps/ProfileForms/AfforestationForm';
import BuyersProfileForm from './Comps/ProfileForms/BuyersForm';
import CRICarbonForm from './Comps/ProfileForms/CRICarbonForm';
import GoProjectDeveloperForm from './Comps/ProfileForms/GoProjectDeveloperForm';
import InvesterProfileForm from './Comps/ProfileForms/InvestForm';
import PlantationForm from './Comps/ProfileForms/PlantationForm';
import VVBForm from './Comps/ProfileForms/VVBForm';
import ProjectionTable from './Comps/ProjectionTable/ProjectionTable';



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
            element: <NewLoginPage />
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
        {
            path: 'signup',
            element: <SignUpForm />
        },
        {
            path: 'resetpassword',
            element: <ForgotPassword />
        },
        {
            path: 'adminprofileform',
            element: <AdminProfileForm />
        },
        {
            path: 'afforestationform',
            element: <AfforestationForm />
        },
        {
            path: 'buyersform',
            element: <BuyersProfileForm />
        },
        {
            path: 'cricarbonform',
            element: <CRICarbonForm />
        },
        {
            path: 'goprojectdeveloperform',
            element: <GoProjectDeveloperForm />
        },
        {
            path: 'investerprofileform',
            element: <InvesterProfileForm />
        },
        {
            path: 'planationform',
            element: <PlantationForm />
        },
        {
            path: 'vvbform',
            element: <VVBForm />
        },
        {
            path: 'projecttiontable',
            element: <ProjectionTable />
        },
    ]);
}

export default Routes