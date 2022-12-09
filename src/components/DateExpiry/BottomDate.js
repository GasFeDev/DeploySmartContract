import { Box, Button} from "@mui/material";
import Image from "next/image";
import logo from "../../../assets/check.svg";
import { useState } from 'react'
import { userService } from '../../../services';
import { toast } from "react-toastify";
import { useAccount, useContract, useNetwork, useSigner } from "wagmi";
import getReactorAddress from "../../utils/getReactorAddress";
import moment from "moment/moment";


const BottomDate = ({ addressContract, DateInital, DateFinal, active, isDisabled }) => {

  let fecha1 = moment(DateInital);
  let fecha2 = moment(DateFinal);
  console.log(fecha2.diff(fecha1, 'days'), ' dias de diferencia');
  let fechaExpiry = fecha2.diff(fecha1, 'days')

  const [pause, setPause ] = useState(active); 
  const abiReactor = require("../ButtonCreateERC1155/abiReactor.json")   

  const { data: signer } = useSigner();
  const { data: account } = useAccount();
  const { activeChain } = useNetwork();
  const contract = useContract({
  addressOrName: getReactorAddress(activeChain?.id),
  contractInterface: abiReactor,
  signerOrProvider: signer,
  });

const [pendingTx, setPendingTx] = useState(false);
  
const setContractActive = async () => {
  if (!account?.address) {
    toast.error("please connect wallet");
    return;
  }
  setPendingTx("Sign transaction.");

  const tx = await contract.setContractActive(fechaExpiry);
  setPendingTx("tx.");
  const receipt = await tx.wait();    
  };

  const handleToggle = async () => {  
        let status = !pause;
        setPause(status); 
        try {
          await setContractActive();
          setPendingTx("Sign transaction.");  
      
      console.log(addressContract, status);       
      await userService.updateReactor(addressContract,{ active: status});
          }
          catch (err) {
            console.error(err);
          }
          setPendingTx(false);
    } 


  return (
    <form>
<Box
        my={0} 
        px={1}
        display="flex"
        justifyContent="center"
        alignItems="center">

<Button   disabled={!isDisabled}
          fullWidth
          style={{
            borderColor:"red",
            backgroundColor: "transparent", 
            borderRadius:"30px",
            width: "30px",
            height:"30px",
            bottom:"3px"
          }}
          
        >

<Image src={logo} alt="Logo" width="30px" height="30px"
       onClick={()=> { handleToggle()}}
       disabled={!isDisabled}
       
       
     />

</Button>

</Box>
    
    </form>
  );
};

export default BottomDate;