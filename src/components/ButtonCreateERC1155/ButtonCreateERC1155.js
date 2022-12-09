import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import abi from "./abi.json";
import PendingTxModal from "../PendingTxModal";
import { useAccount, useContract, useNetwork, useSigner } from "wagmi";
import { toast } from "react-toastify";
import getFactoryAddress from "../../utils/getFactoryAddress";
import { userService } from "../../../services";

const ButtonCreateERC1155 = ({
  onDeployed,
  _proyectDescription,
  _proyectName,
  _newuri,
  _cantidadSupply,
  _tokenPrices,
  owner,
  managerFee,
  statusProject,
  techDetails,
  estimatedRentability,
  initProjectDate,
  Location,
  files,

}) => {
  
  const { data: signer } = useSigner();
  const { data: account } = useAccount();
  const { activeChain } = useNetwork();
  const contract = useContract({
    addressOrName: getFactoryAddress(activeChain?.id),
    contractInterface: abi,
    signerOrProvider: signer,
  });

  const [pendingTx, setPendingTx] = useState(false);

  const createReactor = async () => {
    if (!account?.address) {
      toast.error("please connect wallet");
      return;
    }
    setPendingTx("Sign transaction deploying smart contract.");

    const tx = await contract.createReactor(
      _proyectDescription,
      _proyectName,
      _newuri,
      _cantidadSupply,
      _tokenPrices,
    );
    setPendingTx("Deploying Reactor.");
    const receipt = await tx.wait();
    onDeployed?.(receipt?.events?.[0]?.args?._reactor);
  };

  const handleButtonClick = async () => {
    try {
      await createReactor();
      let upload = {
        addressContract: userService.generateRandomID(15),
        name: _proyectName,
        description: _proyectDescription,
        statusProject,
        uri: _newuri,
        addressOwner: owner,
        addressFee: managerFee,
        maxSupply: Number(_cantidadSupply),
        priceToken: Number(_tokenPrices),
        estimatedRentability: Number(estimatedRentability),
        initProjectDate: Number(initProjectDate),
        techDetails,
        Location,
      };
      setPendingTx("Subiendo el contrato..");
      await userService.createReactor(upload, files[0]);

  
    } catch (err) {
      console.error(err);
    }
    setPendingTx(false);
  };

  return (
    <>
      {pendingTx ? (
        <CircularProgress />
      ) : (
        <Button  
          fullWidth
          style={{
            display: "flex",
            border: "#8cbe21",
            color: "#000",
            backgroundColor: "#8cbe21", 
            borderRadius:"30px",
            maxWidth: "330px",
            fontWeight: "600",
          }}   
          variant="contained"
          onClick={handleButtonClick}
          disabled={_proyectName<=0 || _proyectDescription<=0 || statusProject<=0 || _newuri<=0 || owner<=0 ||_tokenPrices<=0
            || _cantidadSupply<=0 || managerFee<=0 || estimatedRentability<=0 || initProjectDate<=0 || techDetails<=0 || Location<=0}
          
        >
          Create Project
        </Button>
      )}
      
      <PendingTxModal pendingTx={pendingTx} />
      
    </>
    
    
  );
};

export default ButtonCreateERC1155;