import { Box, Typography , Dialog } from '@mui/material';
import './desktop-2.css';
// import onejk from '../../assets/-1jk.png';
// import png from '../../assets/twoJk.png';
// import collection from '../../assets/collection.png';
import Header from '../../Header';
import { useState , useEffect } from "react";
import { useAnchorWallet} from "@solana/wallet-adapter-react";
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";



  const DesktopComponent2 = () => {

    const isConnectedWallet: string | null = localStorage.getItem('Wallet') ?? '';
    const [dataFetched, setDataFetched] = useState<any>(null);
    const [openImageDialog, setOpenImageDialog] = useState<boolean>(false);
   const [selectedImage, setSelectedImage] = useState<string>('');

    const network = (process.env.REACT_APP_SOLANA_NETWORK ??
        "devnet") as WalletAdapterNetwork;
    const anchorWallet = useAnchorWallet();


    const fetchNFTs = () => {
      if (isConnectedWallet === 'true') {
        const nftUrl = `https://api.shyft.to/sol/v1/nft/read_all?network=${network}&address=${anchorWallet?.publicKey}`;

        fetch(nftUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "kRSK8MBUbvIZbaAa",
          },
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error(`Failed to fetch NFTs (${response.status} ${response.statusText})`);
            }
            return response.json();
          })
          .then((data) => {
            console.log(data);
            setDataFetched(data);
          })
          .catch((error) => {
            console.warn('Error fetching NFTs:', error);
          });
      }
    };

    useEffect(() => { fetchNFTs() }, [])

     
      const images: string[] = dataFetched?.result?.map((item: { image_uri: string }) => item.image_uri) || [];

      const handleImageClick = (image: string) => {
        setSelectedImage(image);
        setOpenImageDialog(true);
      };
      

    return (
        <Box className="desktop-2-HUr">
              <Header  isConnectedWallet={ isConnectedWallet} />
            <Box className="auto-group-qsb3-GX8">
                <Box className="auto-group-wwau-kSJ">
                                  {
                    images && images.map((image, index) => (
                      <img
                        key={index}
                        className="collection-hVx"
                        src={image}
                        alt="collection"
                        onClick={() => handleImageClick(image)}
                      />
                    ))
                  }
                </Box>
                <Dialog open={openImageDialog} onClose={() => setOpenImageDialog(false)}>
                <img src={selectedImage} alt="selected" />
              </Dialog>
                <Box className="auto-group-jevh-zjx" textAlign='left'>
                    <Typography variant="body1" className="number-of-nfts-3-7Jn">Number of NFTs = {images.length}</Typography>
                    <Typography variant="body1" className="number-of-trees-15-2Ar">Number of Trees = {images.length * 5}</Typography>
                    <Typography variant="body1" className="total-value-3-sol-x4W"> Total value = {images.length} SOL</Typography>
                </Box>
            </Box>
            <Typography variant="body1" className="your-contribution-z1C">Your Contribution</Typography>
        </Box>
    );
};

export default DesktopComponent2;
