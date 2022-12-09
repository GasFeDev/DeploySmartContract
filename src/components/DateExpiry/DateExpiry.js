import { alpha, Box, FormControlLabel, Grid, Switch, TextField } from "@mui/material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import styles from "../../../styles/Home.module.css";
import {useFormik, Formik} from 'formik';
import BottomDate from "./BottomDate";
import { useState, useEffect} from 'react'
import { userService } from '../../../services';
import styled from "@emotion/styled";
import { lightGreen } from "@mui/material/colors";


const DateExpiry = ({ onDeployed }) => {

  const [isDisabled, setIsDisabled] = useState(false);

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
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      Date:"",
    },
    onSubmit,
  });

  console.log(errors);

  const label = { inputProps: { "aria-label": "Color switch demo"}}
  const GreenSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: lightGreen[80],
      "&:hover": {
        backgroundColor: alpha(lightGreen[100])
      }
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: lightGreen['A400']
    }
  }));

  return (
    <form onSubmit={handleSubmit}>
<Box sx={{
      px: 1,
      my: 0,
    
    }}>

  <Grid container 
        direction="row" 
        justifyContent="center" 
        alignItems="center" 
        rowSpacing={0}     
        columnSpacing={1}   
        columns={{ xs: 4, sm: 8, md: 12 }}
        >     

        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
            disablePast
            id="Date"
            fullWidth
            type={'number'}
            name="Date"
            value={values.Date}
            onChange={(value) => {
              setFieldValue('Date', Date.parse(value));
              }}            
            className={errors.Date && touched.Date ? "input-error" : ""}
              renderInput={(params, error) => <TextField fullWidth required  variant='standard' 
                sx={{
                border: "4px solid",
                borderColor: 'grey.500',
                borderRadius: '10px',
                backgroundColor:'rgb(232, 240, 254)',
                width:'150px',
                height:'40px',
                position:'relative',
                top:'10px',
                marginTop:'-5px',
                transform:'scale(0.8)',
                textAlign: 'center'
              }}    
              InputProps={{
                inputProps: { style: { color: "fieldtext" } },
              }}
              style={{
                top:"5px",
                left:"-5px",
                marginRight:'-10px'
              }}   {...params} {...error}
              
           
              />}
              {...{ disabled: isDisabled}}
            />
            {errors.Date && touched.Date && <p className={styles.error}>{errors.Date}</p>}
            
          </LocalizationProvider> 

          <div>
          <FormControlLabel
          control={
            <GreenSwitch {...label} defaultChecked
              required
              checked={isDisabled}
              onChange={(event) => setIsDisabled(event.target.checked)}
              disabled={isDisabled}
                color="default"
                size="small"
                edge="end"
                inputProps={{
                    'aria-labelledby': 'switch-list-label-reactor',
                }}
                sx={{
                  transform: 'scale(0.9)',
                  position:'relative',
                  right:'0px',
                  left:'110px',
                  marginRight:'-30px',
          
              }} 
            />
          }
          label="Confirm Date"
        />
        </div>

    <button type="submit" 
    style={{
      borderColor:"transparent",
      backgroundColor: "transparent", 
      width: "30px",
      height:"28px",
      marginLeft:"30px"
    }}  >

        <BottomDate    
        type="submit"
        onDeployed={onDeployed} 
        DateInitial={Date.now()}
        DateFinal={values.Date}
        isDisabled={isDisabled}
        />

    </button>   


 
  </Grid>  

</Box>
        </form>
  );
};

export default DateExpiry;