import React,{ useEffect } from "react";
import { Grid, Paper, TextField, Box, Tabs, Typography, Tab, Button } from "@mui/material";
import { useContext } from 'react';
import { NearContext } from "../provider/NearProvider";
import Collection from './Collection';
import DropsCollection from './DropsCollection';


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

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }


export default function StakingForm() {

    const {        
        supplyInsert,
        dropsInsert,
        nftPriceView,
        nftPurchase,
        accountId,
        fetchDropNfts,
        fetchNfts,
        fetchDrops
    } = useContext(NearContext);

    const [drops, setDrops] = React.useState([]);
    const [nftPrice, setNftPrice] = React.useState(null);

    const [dropNfts, setDropNfts] = React.useState([]);
    const [ownedNfts, setOwnedNfts] = React.useState([]);


    const [value, setValue] = React.useState(0);
    const [purchaseData, setPurchaseData] = React.useState({
        tokenId:'',
        dropName:'',
        accountId: '',
        numberOfTokens:'',
        amount:''
    });
    
    const [supply, setSupply] = React.useState({
        tokenId:'',
        supply:''
    });
    const [price, setPrice] = React.useState({
        tokenId:'',
        price:''
    });
    const [drop, setDrop] = React.useState({
        dropName:''
    });

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const onChangeMetaData = (event) => {
        const obj = {};
        obj[event.target.name] = event.target.value;
        setPurchaseData({...purchaseData, ...obj})
    }

    const onChangeSupply = (event) => {
        const obj = {};
        obj[event.target.name] = event.target.value;
        setSupply({...supply, ...obj})
    }

    const onChangeDrop = (event) => {
        const obj = {};
        obj[event.target.name] = event.target.value;
        setDrop({...drop, ...obj})
    }

    const onChangePrice = (event) => {
        const obj = {};
        obj[event.target.name] = event.target.value;
        setPrice({...price, ...obj})
    }

    const purchaseNftSubmit = () => {
        if(purchaseData.tokenId === ''){
           return alert('Please fill complete form!')
        }
        if(purchaseData.dropName === ''){
            return alert('Please fill complete form!')
        }
        if(purchaseData.accountId === ''){
            return alert('Please fill complete form!')
        }
        if(purchaseData.numberOfTokens === ''){
            return alert('Please fill complete form!')
        }
        if(purchaseData.amount === ''){
            return alert('Please fill complete form!')
        } else {
            // tokenId, dropName,numberOfTokens,amount,accountId
            nftPurchase(purchaseData.tokenId, purchaseData.dropName,parseInt(purchaseData.numberOfTokens), purchaseData.amount, purchaseData.accountId)
        }
    }

    const supplySubmit = () => {
        const supplydata = {
            token_id: supply.tokenId,
            supply: supply.supply,
        };
        if(supplydata.token_id === ''){
            alert('Please fill complete form!')
        }
        if(supplydata.supply === ''){
            alert('Please fill complete form!')
        } else{
            supplyInsert(supplydata.token_id,supplydata.supply)
        }
    }

    const dropSubmit = async () => {

        if(drop.dropName === ''){
            alert('Please fill complete form!')
        } else{
            const nfts = await fetchDropNfts(drop.dropName);
            setDropNfts([...nfts])
            console.log('NFTS***************************',nfts)

        }
    }

    const getPriceSubmit = async () => {
        if(price.tokenId === ''){
            alert('Please fill complete form!')
        } else{
            const nftPrice = await nftPriceView(price.tokenId);
            console.log('price**********************************',nftPrice)
            setNftPrice(nftPrice);
        }
    }


    const ownedNftsSubmit = async () => {
       
            const nfts = await fetchNfts();
            const ownedNfts = [];
            nfts.forEach((nft)=>{
                ownedNfts.push(nft.metadata)
            })
            setOwnedNfts([...ownedNfts])
            console.log('NFTS***************************',nfts)

    }

    const fetchDropsCall = async () => {
       
        const drops = await fetchDrops();
        // const activeDrops = [];
        // nfts.forEach((nft)=>{
        //     ownedNfts.push(nft.metadata)
        // })
        if(drop.length > 0){
            setDrops([...drops])
            console.log('DROPS***************************',drops);
    
        }

    }


    const callApi = async () => {

        const drops = await fetchDrops();
        // const activeDrops = [];
        // nfts.forEach((nft)=>{
        //     ownedNfts.push(nft.metadata)
        // })
        if(drops && drops.length > 0){
            setDrops([...drops])
            console.log('DROPS***************************',drops);
        }

        // const nfts = await fetchNfts();
        let nfts = [];
        nfts = await fetchNfts();
        const ownedNfts = [];
        if(nfts){
            nfts.forEach((nft)=>{
                ownedNfts.push(nft.metadata)
            })
        }

        setOwnedNfts([...ownedNfts])
        console.log('NFTS***************************',nfts)

        // if(nfts){
        //     const ownedNfts = [];
        //     nfts.forEach((nft)=>{
        //         ownedNfts.push(nft.metadata)
        //     })
        // }
        // console.log('NFTS owned**************************',nfts)
        // if(ownedNfts.length > 0){
        //     setOwnedNfts([...ownedNfts])
        // }

    }

        useEffect(()=>{

            callApi(value);
            
        },[value])


    return (
        <Paper sx={{ marginTop: '10px' }} elevation={0}>
            <Grid container marginLeft="8px" marginRight="8px" style={{justifyContent: 'center', flexDirection:'vertical'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        {/* <Tab label="Purchase NFT" {...a11yProps(0)} /> */}
                        {/* <Tab label="NFT Price Check" {...a11yProps(1)} /> */}
                        <Tab label="NFTs in Drop " {...a11yProps(0)} />
                        <Tab label="Owned NFTs" {...a11yProps(1)} />
                    </Tabs>
                </Box>
            </Grid>
            <Grid container marginLeft="8px" marginRight="8px" style={{justifyContent: 'center', flexDirection:'vertical'}}>
            {/* <TabPanel style={{width:'30%'}} value={value} index={0}>
                    <Typography fontWeight='bold' variant="h4" color='#000'>Purchase NFT</Typography>

                    <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='tokenId'
                        value={purchaseData.tokenId}
                        fullWidth
                        placeholder="Token Id"
                        onChange={onChangeMetaData}
                        />
                    </div>
                    <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='dropName'
                        value={purchaseData.dropName}
                        fullWidth
                        placeholder="Drop Name"
                        onChange={onChangeMetaData}
                        />
                    </div>
                  <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='accountId'
                        value={purchaseData.accountId}
                        fullWidth
                        placeholder="NFT Receiver Id"
                        onChange={onChangeMetaData}
                        />
                    </div>
                    <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='numberOfTokens'
                        value={purchaseData.numberOfTokens}
                        fullWidth
                        placeholder="Number Of Tokens"
                        onChange={onChangeMetaData}
                        />
                    </div>
                    <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='amount'
                        value={purchaseData.amount}
                        fullWidth
                        placeholder="Amount"
                        onChange={onChangeMetaData}
                        />
                    </div>
                    <div style={{
                        marginTop:'4%'
                    }}>
                        <Button onClick={purchaseNftSubmit} variant='contained'>Submit</Button>
                    </div>
            </TabPanel> */}
            {/* <TabPanel style={{width:'30%'}} value={value} index={1}>
                <Typography fontWeight='bold' variant="h4" style={{color:'#000'}} color='#000'>NFT Price Check</Typography>
                <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='tokenId'
                        value={price.tokenId}
                        fullWidth
                        placeholder="Token ID"
                        onChange={onChangePrice}
                        />
                    </div>
                    <div style={{
                        marginTop:'4%'
                    }}>
                        <Button onClick={getPriceSubmit} variant='contained'>Submit</Button>
                    </div>
                    <Typography variant="h4" style={{color:'#000',marginTop:'4%'}} color='#909091'>{nftPrice? 'NFT Price:' : ''}{' '}{nftPrice}{nftPrice? ' NEAR' : ''}</Typography>
            </TabPanel> */}
            <TabPanel style={{width:'60%'}} value={value} index={0}>
                <Typography fontWeight='bold' variant="h4" color='#000'>Available drops</Typography>
                    <div style={{
                        marginTop:'1%',
                    }}>
                        {/* <TextField
                        name='dropName'
                        value={drop.dropName}
                        fullWidth
                        placeholder="Drop Name"
                        onChange={onChangeDrop}
                        /> */}
                    </div>
                    {/* <div style={{
                        marginTop:'4%'
                    }}>
                        <Button onClick={fetchDropsCall} variant='contained'>Submit</Button>
                    </div> */}
                    <DropsCollection drops={drops}/>
            </TabPanel>
            <TabPanel  onClick={ownedNftsSubmit} style={{width:'60%'}} value={value} index={1}>
                <Typography fontWeight='bold' variant="h4" color='#000'>Owned NFTs</Typography>
                    {/* <div style={{
                        marginTop:'1%',
                    }}>
                        <TextField
                        name='dropName'
                        value={drop.dropName}
                        fullWidth
                        placeholder="Drop Name"
                        onChange={onChangeDrop}
                        />
                    </div> */}
                    {/* <div style={{
                        marginTop:'4%'
                    }}>
                        <Button onClick={ownedNftsSubmit} variant='contained'>Fetch Nfts</Button>
                    </div> */}
                    <Collection notPurchase={true} nfts={ownedNfts}/>
            </TabPanel>
            </Grid>

        </Paper>
    )

}
