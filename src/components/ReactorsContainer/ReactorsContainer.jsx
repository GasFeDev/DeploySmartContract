import { useState, useEffect } from 'react'
import { Card, List, ListSubheader } from "@mui/material"
import { userService } from '../../../services';
import ReactorPausable from '../ReactorPausable';


const ReactorsContainer = () => {
    const [reactors, setReactors] = useState([]);
    
    useEffect(()=>{
        userService.getReactors().then(res =>{
            setReactors(res.data);
        })

    }, []);

    return (
        <Card sx={{maxHeight:170}}
        style={{
            display: "flex",
            borderRadius:"10px",
          }} >        
            <List 
        
            sx={{
                    width: '100%', 
                    borderRadius:'10px', 
                    color:'#000',
                    bgcolor: '#D9D9D9',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 245, 
                    maxWidth: "700px",
                    
                   
                }} 
                subheader={<ListSubheader></ListSubheader>}>
                {reactors.map(reactor => {
                    return <ReactorPausable key={reactor.addressContract} addressContract={reactor.addressContract} name={reactor.name} active={reactor.active}/>
                })}
            </List>
        </Card>
    )
}

export default ReactorsContainer