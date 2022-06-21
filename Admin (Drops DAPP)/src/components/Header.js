import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { NearContext } from '../provider/NearProvider';
import { useContext } from 'react';

export default function ButtonAppBar() {
const {login,isConnecting,accountId,isSignedIn,isRegistered,logout} = useContext(NearContext)
const handleLoginChange =()=>{
   login();
  }
  return (
    <Box sx={{ flexGrow: 1, width : '100%' }}>
      <AppBar backgroundColor='#2C1775' position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{width : "210px"}}>
            Drops Dapp
          </Typography>
          <Typography variant="p" component="div" sx={{width : "210px"}}>
            Role: admin
          </Typography>
          <Box sx={{ display : 'flex' ,justifyContent : 'flex-end' ,width: '100%'}}>
        {isSignedIn ?   <Typography component = "div" >{'Logged in as: '}{accountId}</Typography>: <Button color="inherit" sx={{display:"visible"}} onClick={handleLoginChange}>Connect Wallet</Button>}

          </Box>
          {isSignedIn && (
              <Button color="inherit" sx={{whiteSpace:'no-wrap',width:'10%'}} onClick={logout}>
                Log Out
              </Button>
        )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
