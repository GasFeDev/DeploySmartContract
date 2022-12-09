import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import styles from "../../../styles/Home.module.css"


const StatusProject = ({ valueSelect ,setValueSelect}) => {
    const handleChange = (event) => {
        setValueSelect(event.target.value);
    };

    return (
        <FormControl 
          fullWidth    
          >
            <InputLabel id="status-project-select-label" ></InputLabel>
            <Select 
            sx={{
                border: "4px solid",
                borderColor: 'grey.500',
                borderRadius: '10px',
                backgroundColor:'rgb(232, 240, 254)',
                }}    
                InputProps={{
                inputProps: { style: { color: "#d9d9d9" } },
                }}
                 style={{
                bottom:"11px",
                }}             
                value={valueSelect}
      
                labelId="status-project-select-label"
                id="status-project-select"       
                label="Selecciona el estado del proyecto"
                onChange={handleChange}
                variant='standard'
                required     
                >
                <MenuItem value={'IN_FINANCING'}><div className={styles.estado}>
                En financiación
            </div>{" "}</MenuItem>
                <MenuItem value={'IN_PROD'}> <div className={styles.estado}>
                En producción
            </div>{" "}</MenuItem>
                <MenuItem value={'CLOSED'}> <div className={styles.estado}>
                Cerrado
            </div>{" "}</MenuItem>
            </Select>
        </FormControl>
    );
};

export default StatusProject;