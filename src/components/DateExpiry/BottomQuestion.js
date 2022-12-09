import { Box} from "@mui/material";
import Image from "next/image";
import logo from "../../../assets/question.svg";



const BottomQuestion = () => {

  return (
    <form >
<Box
        my={0}
        px={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        marginLeft="-10px"
        >



       <Image src={logo} alt="Logo" width="23px" height="23px" /> 
              
         
    </Box>
    
    </form>
  );
};

export default BottomQuestion;