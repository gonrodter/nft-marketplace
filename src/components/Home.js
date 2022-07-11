import {ethers} from 'ethers';
import WalletBalance from './WalletBalance';
import Header from './Header';
import {useEffect, useState} from 'react';
import CripyFaces from '../artifacts/contracts/MyNFT.sol/CripyFaces.json';
import { getAccountPath } from 'ethers/lib/utils';

const contractAddress = '0x5FbDB2315678afecb367f032d93F642f64180aa3';

const provider = new ethers.providers.Web3Provider(window.ethereum);

//get the end user
const signer = provider.getSigner();

//get the smart contract
const contract = new ethers.Contract(contractAddress, CripyFaces.abi, signer);

function Home(){

    const [totalMinted, setTotalMinted] = useState(0);

    useEffect(() => {
        getCount();
    }, []);

    const getCount = async () => {
        const count = await contract.count();
        setTotalMinted(parseInt(count));
    };

    return(
        <div>
            <Header />
            <WalletBalance />
            <img src='images/placeholder.png' alt='Placeholder'></img>
            <h1>Cripy Faces NFT Collection</h1>
                {Array(totalMinted + 1)
                .fill(0)
                .map((_, i) => (
                    <div key={i}>
                        <NFTImage tokenId={i} getCount={getCount} />
                    </div>
                ))}
        </div>
    );
}

function NFTImage({ tokenId, getCount}){
    const contentId = 'QmdAm869R67UZPpZ9gidid7zZJMfdZDoufRNfqCZUeCv47';
    const metadataURI = `${contentId}/${tokenId}.json`;
    // const imageURI = `https://gateaway.pinata.cloud/ipfs/${contentId}/${tokenId}.png`;
    const imageURI = `images/${tokenId}.png`;

    const [isMinted, setIsMinted] = useState(false);

    useEffect(() => {
        getMintedStatus();
    }, [isMinted]);

    const getMintedStatus = async () => {
        const result = await contract.isContentOwned(metadataURI);
        console.log(result);
        setIsMinted(result);
    };

    const mintToken = async () => {
        const connection = contract.connect(signer);
        const addr = connection.address;
        const result = await contract.payToMint(addr, metadataURI, {
            value: ethers.utils.parseEther('0.05'),
        });

        await result.wait();
        getMintedStatus();
        getCount();
    };

    async function getURI() {
        const uri = await contract.tokenURI(tokenId);
        alert(uri);
    }

    return (
        <div>
            <img src={isMinted ? imageURI : 'images/placeholder.png'}></img>
                <h5>ID #{tokenId}</h5>
                {!isMinted ? (
                    <button onClick={mintToken}>
                        Mint
                    </button>
                ) : (
                    <button onClick={getURI}>
                        Taken! Show URI
                    </button>
                )}
        </div>
    );
}

export default Home;