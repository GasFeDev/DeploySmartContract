import { useState, useEffect} from 'react'
import { ListItem, ListItemIcon, ListItemText, Switch, alpha, styled } from "@mui/material"
import { lightGreen} from "@mui/material/colors";
import FactoryIcon from '@mui/icons-material/Factory';
import { userService } from '../../../services';
import { toast } from "react-toastify";
import { useAccount, useContract, useNetwork, useSigner } from "wagmi";
import DateExpiry from '../DateExpiry/DateExpiry';
import BottomQuestion from '../DateExpiry/BottomQuestion';


const ReactorPausable = ({ addressContract, name, active }) => {
    const [pause, setPause ] = useState(active);       
    const abiReactor = require("../ButtonCreateERC1155/abiReactor.json")   

    const { data: signer } = useSigner();
    const { data: account } = useAccount();  
    const { activeChain } = useNetwork();  
    const contract = useContract({
    addressOrName: addressContract,
    contractInterface: abiReactor,
    signerOrProvider: signer,
    });

  const [pendingTx, setPendingTx] = useState(false);
    
  const setPausado = async () => {
    if (!account?.address) {
      toast.error("please connect wallet");
      return;
    }
    setPendingTx("Sign transaction.");

    const tx = await contract.setPaused(true);
    setPendingTx("tx.");
    const receipt = await tx.wait();    
    };

  const setDespausado = async () => {
    if (!account?.address) {
      toast.error("please connect wallet");
      return;
      }
    setPendingTx("Sign transaction.");
  
    const tx = await contract.setPaused(false);
    setPendingTx("tx.");
    const receipt = await tx.wait();    
    };

    const handleToggle = async () => {
        
          setPendingTx("Sign transaction.");        
          let status = !pause;
          setPause(status);
          if(status){         
            
            try {
              await setPausado();
            } catch (error) {
              window.alert("transaccion rechazada");
            }          
            console.log(setPausado);
          } else {

            try {
              await setDespausado();
            } catch (error) {
              window.alert("transaccion rechazada");
            }
            console.log(setDespausado);
          }
        
        console.log(addressContract, status);       
        await userService.updateReactor(addressContract,{ active: status});
    };

    const GreenSwitch = styled(Switch)(({ theme }) => ({
        "& .MuiSwitch-switchBase.Mui-checked": {
          color: lightGreen[80],
          "&:hover": {
            backgroundColor: alpha(lightGreen[100], theme.palette.action.hoverOpacity)
          }
        },
        "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
          backgroundColor: lightGreen['A400']
        }
      }));
      const label = { inputProps: { "aria-label": "Color switch demo"}}

      const list = {
        color: 'black',
        padding:"0",
        marginBottom:"2px"
       
      }
      const listText = {
        color: 'black',
        padding:"0",
        marginLeft:"-15px"
      }
      const listIcon = {
        color: 'black',
        padding:"0",
        marginLeft:"10px"
      }
      const listDate = {
        position:'relative',
        left:'-10px',
        marginLeft:"30px"
      }

    return (
        <ListItem  style={list}>
            <ListItemIcon style={listIcon}>
                <FactoryIcon />
            </ListItemIcon>
            <ListItemText id="switch-list-label-reactor" primary={name}  style={listText}/>
            <GreenSwitch {...label} defaultChecked
         
                color="default"
                size="small"
                edge="end"
                onChange={()=> { handleToggle() }}
                checked={pause}
                inputProps={{
                    'aria-labelledby': 'switch-list-label-reactor',
                }}
                sx={{
                  transform: 'scale(0.9)',
          
              }} 
                
            />
           
                    <DateExpiry style={listDate}/>
                 
            <BottomQuestion/>
        </ListItem>        
    )
}

export default ReactorPausable