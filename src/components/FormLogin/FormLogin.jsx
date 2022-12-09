import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { userService } from '../../../services';
import { Alert, Button, Card, CardContent, CardHeader, CardMedia, CircularProgress, FormControlLabel, FormGroup, Grid, TextField } from '@mui/material';



const FormLogin = () => {
    const router = useRouter();

    useEffect(() => {
        // redirect to home if already logged in
        if (userService.userValue) {
            router.push('/');
        }
    }, []);

    // form validation rules 
    const validationSchema = Yup.object().shape({
        email: Yup.string().email("Debe ser un email valido!").required('El email es requerido'),
        password: Yup.string().required('La contraseña es requerida')
    });
    const formOptions = { 
        resolver: yupResolver(validationSchema),
        defaultValues: {
            email: '',
            password: ''
        }

    };

    // get functions to build form with useForm() hook
    const {  handleSubmit, setError, formState, control } = useForm(formOptions);
    const { errors } = formState;

    function onSubmit({ email, password }) {
        
        return userService.login(email, password)
            .then(() => {
                // get return url from query parameters or default to '/'
                const returnUrl = router.query.returnUrl || '/';
                router.push(returnUrl);
            })
            .catch(error => {
                if(typeof error === 'object' && error !== null){
                    setError('apiError', { message: error.message });
                }else{
                    setError('apiError', { message: error });
                }
            });
    }

    return (
        <Card sx={{ width: 500, p:4, m:5, borderRadius:10, backgroundColor: `#010D11`, color: `white` }}>
            <CardMedia component="img" 
                sx={{
                    width:`80%`,
                    marginX:`auto`
                }}               
                src="logo.png"                
                alt="SSS Tech" 
            />
            <CardHeader title={"Sign In"} 
                titleTypographyProps={{
                    fontFamily:`inherit`,
                    fontWeight:`bold`,
                    textAlign:`center`,
                    fontSize:`25px`,
                    margin:`.5rem 0`
                }}
            />
            <CardContent sx={{
                    px:5,
                    py:`0 !important`
                }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Controller
                        name="email"                                                                                     
                        control={control}
                        render={({ field }) => <TextField 
                            color='secondary'
                            variant='standard'                                          
                            sx={{
                                my:1,
                                fieldset: { 
                                    border: "1px solid #8CBE21"
                                },                                
                                input: {
                                    color: 'white',
                                    borderBottom: "1px solid #ffff",                                    
                                    fontFamily: 'inherit',                                    
                                },
                                label:{
                                    color: 'white',
                                    fontFamily: 'inherit'
                                },
                            }}  
                            FormHelperTextProps={{
                                style: {
                                    fontFamily: 'inherit',
                                    color: 'red'
                                }
                            }}                          
                            {...field} 
                            label="Email" 
                            helperText={errors.email?.message} 
                            fullWidth/>
                        }
                    />

                    <Controller
                        name="password"                                                                                     
                        control={control}
                        render={({ field }) => <TextField 
                            color='secondary'
                            variant='standard' 
                            sx={{
                                my:1,
                                fieldset: { 
                                    border: "1px solid #8CBE21"
                                },                                
                                input: {
                                    color: 'white',
                                    borderBottom: "1px solid #ffff",                                    
                                    fontFamily: 'inherit',                                    
                                },
                                label:{
                                    color: 'white',
                                    fontFamily: 'inherit'
                                },
                            }}
                            FormHelperTextProps={{
                                style: {
                                    fontFamily: 'inherit',
                                    color: 'red'
                                }
                            }}
                            {...field} 
                            label="Contraseña" 
                            type={"password"} 
                            fullWidth/>
                        }
                    />
            
                    <Button type="submit"                         
                        sx={{
                            fontFamily:`inherit`,
                            fontWeight:`bold`,                
                            color:`#010D11`,
                            my:4,                            
                            borderRadius: 10,
                            backgroundColor: '#8CBE21',
                            ":hover":{
                                backgroundColor: '#7BA71F',
                                color: `white`
                            }                       
                        }} 
                        variant="contained" 
                        disabled={formState.isSubmitting} 
                        fullWidth>
                        {formState.isSubmitting && <CircularProgress/> }
                        Login
                    </Button>

                    {errors.apiError &&
                        <Alert severity='error' >{errors.apiError?.message}</Alert>                            
                    }                                
                    
                </form>
            </CardContent>                                
        </Card>
    )
}

export default FormLogin