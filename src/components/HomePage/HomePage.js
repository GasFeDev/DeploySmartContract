import styles from "../../../styles/Home.module.css";
//import MintNFT from "../MintNFT";
import { useState } from "react";
import { Box } from "@mui/system";
import CreateERC1155 from "../CreateERC1155";
import { Grid} from "@mui/material";
import ReactorsContainer from "../ReactorsContainer";

const HomePage = () => {
  const [contractAddress, setContractAddress] = useState();

  return (
    <>
       <h1 className={styles.title}>Set Up</h1>

      {contractAddress ? (
        <CreateERC1155 contractAddress={contractAddress} />
      ) : (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
          p={2}
          gap={0}
        >
          <h2 className={styles.typo}>
            Get started:{" "}
            <strong className={styles.strong}>
              Crear el Smart Contract del Reactor.
            </strong>{" "}
          </h2>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CreateERC1155 onDeployed={setContractAddress} />
              <Box
          my={3} 
          display="flex"
          justifyContent="center"
          alignItems="center"
          >
            <ReactorsContainer />
          </Box>
            </Grid>           
          </Grid>
        </Box>
      )}
    </>
  );
};

export default HomePage;
