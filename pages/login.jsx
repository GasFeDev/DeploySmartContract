
import { Box } from '@mui/system';
import Head from 'next/head';
import FormLogin from '../src/components/FormLogin';


function Login() {
    

    return (
        <>
            <Head>
                <title>Login - 3S Reactors</title>                
            </Head>

            <Box sx={{
                  background: `rgb(2,0,36)`,
                  background: `linear-gradient(324deg, rgba(2,0,36,1) 0%, rgba(5,63,84,1) 15%, rgba(45,202,212,1) 100%)`
                }} height={'100vh'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <FormLogin/>                        
            </Box>
        </>
    );
}

export default Login;