import { useRoutes, Navigate, } from 'react-router-dom'
import * as anchor from "@project-serum/anchor";
import { DEFAULT_TIMEOUT } from "./connection";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";


// PAGE COMPONENTS
import Contribution from './Comps/Menu/Contribution/Contribution';
import ProjectTracking from './Comps/ProjectTracking/ProjectTracking';
import Footprint from './Comps/Menu/Footprint/Footprint';
import Offset from './Comps/Menu/Offset/Offset';
import MRV from './Comps/Menu/MRV/MRV';
import ListedLands from './Comps/NineProfilePageComps/LandComponents/ListedLands';
import AddLands from './Comps/NineProfilePageComps/LandComponents/AddLands';
import Home from './Comps/Home/Home';
import Pagenotfound from './Comps/PagenotFound/Pagenotfound';
import NewLoginPage from './Comps/LoginPage/NewLogin';
import SignUpForm from './Comps/SignUpAndForgotPass/SignupForm';
import ForgotPassword from './Comps/SignUpAndForgotPass/ForgotPassword';
import AdminProfileForm from './Comps/NineProfilePageComps/Admin/AdminProfileForm';
import AfforestationForm from './Comps/NineProfilePageComps/Afforestation/AfforestationForm';
import BuyersProfileForm from './Comps/NineProfilePageComps/Buyer/BuyersForm';
import CRICarbonForm from './Comps/NineProfilePageComps/CRI Carbon/CRICarbonForm';
import GoProjectDeveloperForm from './Comps/NineProfilePageComps/GOGreenProjectDeveloper/GoProjectDeveloperForm';
import InvesterProfileForm from './Comps/NineProfilePageComps/InvestorComponents/InvestForm';
import PlantationForm from './Comps/NineProfilePageComps/Planatation/PlantationForm';
import VVBForm from './Comps/NineProfilePageComps/VVB/VVBForm';
import ProjectionTable from './Comps/ProjectionTable/ProjectionTable';
import UserProfile from './Comps/ProfilePageSection/UserProfile';
import UpdateInvestLands from './Comps/NineProfilePageComps/InvestorComponents/UpdateInvestLands';
import GovtAgencyForm from './Comps/NineProfilePageComps/GovtAgency/GovtAgencyForm';
import InvestedLands from './Comps/NineProfilePageComps/InvestorComponents/InvestedLands';
import UpdateAddedLands from './Comps/NineProfilePageComps/LandComponents/UpdateAddedLands';



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
            path: 'projectiontable',
            element: <ProjectionTable />
        },
        {
            path: 'updateaddedlands',
            element: <UpdateAddedLands />,
        },
        {
            path: 'profile',
            element: <UserProfile />,
        },
         {
            path: 'investedlands',
            element: <InvestedLands />
        },
        {
            path: 'govtagencyform',
            element: <GovtAgencyForm />
        },
        {
            path:'updateinvestedlands',
            element:<UpdateInvestLands />,
        }
    ]);
}

export default Routes