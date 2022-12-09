import { useState } from "react";
import { Button, CircularProgress } from "@mui/material";
import abi from "./abi.json";
import PendingTxModal from "../PendingTxModal";
import { useAccount, useContract, useNetwork, useSigner } from "wagmi";
import { toast } from "react-toastify";
import getFactoryAddress from "../../utils/getFactoryAddress";
import { userService } from "../../../services";

const CreateDateExpiry = ({
  onDeployed,
  DateOfExpiry,


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
        DateOfExpiry,
    );
    setPendingTx("Checking date");
    const receipt = await tx.wait();
    onDeployed?.(receipt?.events?.[0]?.args?._reactor);
  };

  const handleButtonClick = async () => {
    try {
      await createReactor();
      let upload = {
        addressContract: userService.generateRandomID(15),
        DateOfExpiry: Number(DateOfExpiry),

      };
      setPendingTx("Creating date...");
      await userService.createReactor(upload);

  
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
        onClick={handleButtonClick}
>
Create Date
        </Button>

      )}
      
      <PendingTxModal pendingTx={pendingTx} />
      
    </>
    
    
  );
};

export default CreateDateExpiry;