import React,{ useEffect } from "react";
import { Grid, Paper, Box, Tabs, Typography, Tab } from "@mui/material";
import { useContext } from 'react';
import { NearContext } from "../provider/NearProvider";
import Collection from './Collection';
import DropsCollection from './DropsCollection';
import NftCollection from './NftCollection';


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


export default function Drops() {

    const {        
        fetchNfts,
        fetchDrops
    } = useContext(NearContext);

    const [drops, setDrops] = React.useState([]);
    const [ownedNfts, setOwnedNfts] = React.useState([]);
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };


    const ownedNftsSubmit = async () => {
            const nfts = await fetchNfts();
            const ownedNfts = [];
            nfts.forEach((nft)=>{
                ownedNfts.push(nft.metadata)
            })
            console.log({ownedNfts})
            setOwnedNfts([...ownedNfts])
    }

    const callApi = async () => {
        const drops = await fetchDrops();
        if(drops && drops.length > 0){
            setDrops([...drops])
        }
        let nfts = [];
        nfts = await fetchNfts();
        const ownedNfts = [];
        if(nfts){
            nfts.forEach((nft)=>{
                ownedNfts.push(nft.metadata)
            })
        }
        setOwnedNfts([...ownedNfts])
    }

        useEffect(()=>{
            callApi(value);
        },[value])


    return (
        <Paper sx={{ marginTop: '10px' }} elevation={0}>
            <Grid container marginLeft="8px" marginRight="8px" style={{justifyContent: 'center', flexDirection:'vertical'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="NFTs in Drop " {...a11yProps(0)} />
                        <Tab label="Owned NFTs" {...a11yProps(1)} />
                    </Tabs>
                </Box>
            </Grid>
            <Grid container marginLeft="8px" marginRight="8px" style={{justifyContent: 'center', flexDirection:'vertical'}}>

            <TabPanel style={{width:'60%'}} value={value} index={0}>
                <Typography fontWeight='bold' variant="h4" color='#000'>Available drops</Typography>
                    <div style={{
                        marginTop:'1%',
                    }}>
                    </div>
                    <DropsCollection notPurchase={false} drops={drops}/>
            </TabPanel>
            <TabPanel  onClick={ownedNftsSubmit} style={{width:'60%'}} value={value} index={1}>
                <Typography fontWeight='bold' variant="h4" color='#000'>Owned NFTs</Typography>
                   <NftCollection notPurchase={true} nfts={ownedNfts}/> 
            </TabPanel>
            </Grid>
        </Paper>
    )

}
