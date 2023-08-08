import dotenv from 'dotenv';
dotenv.config();
import "./App.css";
import { useMemo } from "react";
import { clusterApiUrl } from "@solana/web3.js";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";

import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import { SlopeWalletAdapter } from "@solana/wallet-adapter-slope";
import { SolflareWalletAdapter } from "@solana/wallet-adapter-solflare";
import {
  SolletWalletAdapter,
  SolletExtensionWalletAdapter,
} from "@solana/wallet-adapter-sollet";
import GGV from './assets/GGVLOGO.png';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import {Box} from '@mui/material';



const network = (process.env.REACT_APP_SOLANA_NETWORK ??
  "devnet") as WalletAdapterNetwork;


const App = () => {
  const endpoint = useMemo(() => clusterApiUrl(network), []);

  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ network }),
      new SlopeWalletAdapter(),
      new SolletWalletAdapter({ network }),
      new SolletExtensionWalletAdapter({ network }),
    ],
    []
  );


  return (
      <ConnectionProvider endpoint={endpoint}>
        <WalletProvider wallets={wallets} autoConnect>
          <WalletDialogProvider>
            <Router>
              <Routes />
            </Router>
            <Box display='flex' justifyContent='end'>
            <img src={GGV} alt='logo' style={{ width: 100, height: 90, objectFit: 'contain' , position:'fixed', top:'86%', right:'-15px' }} />
            </Box>
          </WalletDialogProvider>
        </WalletProvider>
      </ConnectionProvider>
  );
};

export default App;
