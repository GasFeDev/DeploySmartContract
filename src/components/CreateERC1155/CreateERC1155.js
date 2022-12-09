import { Box, Button, Grid, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useState } from "react";
import ButtonCreateERC1155 from "../ButtonCreateERC1155";
import StatusProject from "../StatusProject";
import styles from "../../../styles/Home.module.css";
import {useFormik, useField } from 'formik';
import { basicSchema } from "../../schemas";


const CreateERC1155 = ({ onDeployed }) => {

  //Backend
  const [statusProject, setStatusProject] = useState("");
  const [files,setFiles] = useState();
  const [fileSelected,setFileSelected] = useState(false);


  const onSubmit = async (values, actions) => {
    console.log(values);
    console.log(actions);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };
  
  
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      nombre: "",
      descripcion: "",
      contrato: "",
      address: "",
      addressF: "",
      TotalShares: "",
      SharePrice:"",
      EstimatedProfitability:"",
      TechnicalDetails:"",
      Location:"",
      StartOperation:Date.now(),
    },
    validationSchema: basicSchema,
    onSubmit,
  });

  console.log(errors);
  

  return (
    <form onSubmit={handleSubmit} >
    <Box sx={{
      px: 3,
      my: -1.5,
    
    }}>
      
      <Grid container 
        direction="row" 
        justifyContent="center" 
        alignItems="center" 
        rowSpacing={2}     
        columnSpacing={2}   
        columns={{ xs: 4, sm: 8, md: 12 }}
        >     
        
        <Grid item xs={2} sm={3} md={3} color="#d9d9d9" 
          className={styles.mq}
          >
        Project name
          <TextField
          variant='standard'
          fullWidth   
          sx={{
            border: "4px solid",
            borderColor: 'grey.500',
            borderRadius: '10px',
            backgroundColor:'rgb(232, 240, 254)',
            
          }}    
          InputProps={{
            inputProps: { style: { color: "fieldtext" } },
          }}
          style={{
            top:"5px",
          }}  
          value={values.nombre}
          onChange={handleChange}
          id="nombre"
          type="nombre"
          placeholder="Reactor_Name"
          onBlur={handleBlur}
          className={errors.nombre && touched.nombre ? "input-error" : ""}
        />
        {errors.nombre && touched.nombre && <p className={styles.error}>{errors.nombre}</p>}
        </Grid> 
        
        <Grid item xs={2} sm={3} md={3} color="#d9d9d9"
          className={styles.mq}>
        Description
        <TextField
          variant='standard'
          fullWidth   
          sx={{
            border: "4px solid",
            borderColor: 'grey.500',
            borderRadius: '10px',
            backgroundColor:'rgb(232, 240, 254)',
          }}    
          InputProps={{
            inputProps: { style: { color: "fieldtext" } },
          }}
          style={{
            top:"5px",
          }}  
          value={values.descripcion}
          onChange={handleChange}
          id="descripcion"
          type="descripcion"
          placeholder="Reactor-..."
          onBlur={handleBlur}
          className={errors.descripcion && touched.descripcion ? "input-error" : ""}
        />
        {errors.descripcion && touched.descripcion && <p className={styles.error}>{errors.descripcion}</p>}
        </Grid>       

        <Grid item xs={2} sm={3} md={3} color="#d9d9d9" position="relative" top="8px"
          className={styles.mq} >    
        Select the State
          <StatusProject 
          valueSelect={statusProject} setValueSelect={setStatusProject}

        />
        </Grid>

        <Grid item xs={2} sm={3} md={3} color="#d9d9d9"
          className={styles.mq}>
        Legal contract
        <TextField
          variant='standard'
          fullWidth   
          sx={{
            border: "4px solid",
            borderColor: 'grey.500',
            borderRadius: '10px',
            backgroundColor:'rgb(232, 240, 254)',
          }}    
          InputProps={{
            inputProps: { style: { color: "fieldtext" } },
          }}
          style={{
            top:"5px",
          }}  
          value={values.contrato}
          onChange={handleChange}
          id="contrato"
          type="contrato"
          placeholder="ipfs://"
          onBlur={handleBlur}
          className={errors.contrato && touched.contrato ? "input-error" : ""}
        />
        {errors.contrato && touched.contrato && <p className={styles.error}>{errors.contrato}</p>}
        </Grid>

        <Grid item xs={2} sm={3} md={3} color="#d9d9d9"
          className={styles.mq}>
        Address Owner
        <TextField
          variant='standard'
          fullWidth   
          sx={{
            border: "4px solid",
            borderColor: 'grey.500',
            borderRadius: '10px',
            backgroundColor:'rgb(232, 240, 254)',
          }}    
          InputProps={{
            inputProps: { style: { color: "fieldtext" } },
          }}
          style={{
            top:"5px",
          }}  
          value={values.address}
          onChange={handleChange}
          id="address"
          type="address"
          placeholder="Address"
          onBlur={handleBlur}
          className={errors.address && touched.address ? "input-error" : ""}
        />
        {errors.address && touched.address && <p className={styles.error}>{errors.address}</p>}
        </Grid>

        <Grid item xs={2} sm={3} md={3} color="#d9d9d9"
          className={styles.mq}>
        Address Fee
        <TextField
          variant='standard'
          fullWidth   
          sx={{
            border: "4px solid",
            borderColor: 'grey.500',
            borderRadius: '10px',
            backgroundColor:'rgb(232, 240, 254)',
          }}    
          InputProps={{
            inputProps: { style: { color: "fieldtext" } },
          }}
          style={{
            top:"5px",
          }}  
          value={values.addressF}
          onChange={handleChange}
          id="addressF"
          type="addressF"
          placeholder="Address"
          onBlur={handleBlur}
          className={errors.addressF && touched.addressF ? "input-error" : ""}
        />
        {errors.addressF && touched.addressF && <p className={styles.error}>{errors.addressF}</p>}
        </Grid>

        <Grid item xs={2} sm={3} md={3} color="#d9d9d9"
          className={styles.mq}>
        Total Shares
          <TextField
          variant='standard'
          fullWidth   
          sx={{
            border: "4px solid",
            borderColor: 'grey.500',
            borderRadius: '10px',
            backgroundColor:'rgb(232, 240, 254)',
          }}    
          InputProps={{
            inputProps: { style: { color: "fieldtext" } },
          }}
          style={{
            top:"5px",
          }}  
          value={values.TotalShares}
          onChange={handleChange}
          id="TotalShares"
          type={'number'}
          placeholder="Valor"
          onBlur={handleBlur}
          className={errors.TotalShares && touched.TotalShares ? "input-error" : ""}
        />
        {errors.TotalShares && touched.TotalShares && <p className={styles.error}>{errors.TotalShares}</p>}
        </Grid>

        <Grid item xs={2} sm={3} md={3} color="#d9d9d9"
          className={styles.mq}>
        Share Price
        <TextField
          variant='standard'
          fullWidth   
          sx={{
            border: "4px solid",
            borderColor: 'grey.500',
            borderRadius: '10px',
            backgroundColor:'rgb(232, 240, 254)',
          }}    
          InputProps={{
            inputProps: { style: { color: "fieldtext" } },
          }}
          style={{
            top:"5px",
          }}  
          value={values.SharePrice}
          onChange={handleChange}
          id="SharePrice"
          type={'number'}
          placeholder="Valor"
          onBlur={handleBlur}
          className={errors.SharePrice && touched.SharePrice ? "input-error" : ""}
        />
        {errors.SharePrice && touched.SharePrice && <p className={styles.error}>{errors.SharePrice}</p>}
        </Grid>

        <Grid item xs={2} sm={3} md={3} color="#d9d9d9"
          className={styles.mq}>
        Estimated Profitability
        <TextField
          variant='standard'
          fullWidth   
          sx={{
            border: "4px solid",
            borderColor: 'grey.500',
            borderRadius: '10px',
            backgroundColor:'rgb(232, 240, 254)',
          }}    
          InputProps={{
            inputProps: { style: { color: "fieldtext" } },
          }}
          style={{
            top:"5px",
          }}  
          value={values.EstimatedProfitability}
          onChange={handleChange}
          id="EstimatedProfitability"
          type={'number'}
          placeholder="Valor"
          onBlur={handleBlur}
          className={errors.EstimatedProfitability && touched.EstimatedProfitability ? "input-error" : ""}
        />
        {errors.EstimatedProfitability && touched.EstimatedProfitability && <p className={styles.error}>{errors.EstimatedProfitability}</p>}
        </Grid>

        <Grid item xs={2} sm={3} md={3} color="#d9d9d9"
          className={styles.mq}>
        Start of Operation       
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            id="StartOperation"
            type={'number'}
            name="StartOperation"
            onBlur={handleBlur}
            value={values.StartOperation}
            onChange={(value) => {
              setFieldValue('StartOperation', Date.parse(value));
              }}            
            className={errors.StartOperation && touched.StartOperation ? "input-error" : ""}
              renderInput={(params, error) => <TextField fullWidth required  variant='standard' sx={{
                border: "4px solid",
                borderColor: 'grey.500',
                borderRadius: '10px',
                backgroundColor:'rgb(232, 240, 254)',
              }}    
              InputProps={{
                inputProps: { style: { color: "fieldtext" } },
              }}
              style={{
                top:"5px",
              }}   {...params} {...error}
              helperText={error ? error.message : null}
              />}
            />
            {errors.StartOperation && touched.StartOperation && <p className={styles.error}>{errors.StartOperation}</p>}
          </LocalizationProvider>
        </Grid>                
        
        <Grid item xs={2} sm={3} md={3} color="#d9d9d9"
          className={styles.mq}>
        Technical Details
        <TextField
          variant='standard'
          fullWidth   
          sx={{
            border: "4px solid",
            borderColor: 'grey.500',
            borderRadius: '10px',
            backgroundColor:'rgb(232, 240, 254)',
          }}    
          InputProps={{
            inputProps: { style: { color: "fieldtext" } },
          }}
          style={{
            top:"5px",
          }}  
          value={values.TechnicalDetails}
          onChange={handleChange}
          id="TechnicalDetails"
          type="TechnicalDetails"
          placeholder="Details"
          onBlur={handleBlur}
          className={errors.TechnicalDetails && touched.TechnicalDetails ? "input-error" : ""}
        />
        {errors.TechnicalDetails && touched.TechnicalDetails && <p className={styles.error}>{errors.TechnicalDetails}</p>}
        </Grid>

        <Grid item xs={2} sm={3} md={3} color="#d9d9d9"
          className={styles.mq}>
        Location
        <TextField
          variant='standard'
          fullWidth   
          sx={{
            border: "4px solid",
            borderColor: 'grey.500',
            borderRadius: '10px',
            backgroundColor:'rgb(232, 240, 254)',
          }}    
          InputProps={{
            inputProps: { style: { color: "fieldtext" } },
          }}
          style={{
            top:"5px",
          }}  
          value={values.Location}
          onChange={handleChange}
          id="Location"
          type="Location"
          placeholder="Details"
          onBlur={handleBlur}
          className={errors.Location && touched.Location ? "input-error" : ""}
        />
        {errors.Location && touched.Location && <p className={styles.error}>{errors.Location}</p>}
        </Grid>
        
        <Grid >
          <Button
            sx={{
              minHeight:'100%'
            }}
            variant="outlined"
            component="label"  
            style={{
              display: "flex",
              border: "2px solid",
              borderColor: "rgb(158, 158, 158)",
              color: "#d9d9d9",
              backgroundColor: "#010d11",
              marginTop:"25px",
              left:"8px",
              alignContent:"center", 
              alignItems:"center",
              borderRadius:"30px",
              fontWeight: "600",
              width: 230
              
            }}         
            fullWidth>
              { fileSelected ? `Portada seleccionada` : `Subir Portada`}
              <input
                required
                type="file"
                onChange={(e)=>{ setFiles(e.target.files); setFileSelected(true); }}
                accept="image/png, image/gif, image/jpeg"
                hidden
              />
          </Button>
        </Grid>
      
      </Grid>  
    
      <Box
          my={3} 
          display="flex"
          justifyContent="center"
          alignItems="center">

      <button disabled={isSubmitting} type="submit"
      style={{
        display: "flex",
        border: "#8cbe21",
        color: "#000",
        backgroundColor: "#8cbe21", 
        borderRadius:"30px",
        width: "330px",
        fontWeight: "600",
      }}   >
        <ButtonCreateERC1155 
          disabled={isSubmitting} type="submit"
          onDeployed={onDeployed} 
          _proyectName={values.nombre} 
          _proyectDescription={values.descripcion} 
          _newuri={values.contrato} 
          _cantidadSupply={values.TotalShares} 
          _tokenPrices={values.SharePrice} 
          owner={values.address} 
          managerFee={values.addressF}
          statusProject={statusProject}
          techDetails={values.TechnicalDetails}
          estimatedRentability={values.EstimatedProfitability}
          initProjectDate={values.StartOperation}
          Location={values.Location}
          files={files}
        />   
    </button>               
                                  
                    
      </Box>
      

      <Box><h2 className={styles.titleReact}>
      List of Reactors/Projects
          </h2>
      </Box>   
    </Box>
   
        </form>
  );
};

export default CreateERC1155;
