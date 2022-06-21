import React from "react";
import { Grid, Paper, TextField, Box, Tabs, Typography, Tab, Button } from "@mui/material";
import { useContext } from 'react';
import { NearContext } from "../provider/NearProvider";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

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
        nftPriceInsert,
        insertMetadata,
        removeDrop
    } = useContext(NearContext);

    const [startsAt, setStartsAt] = React.useState('');
    const [endsAt, setEndsAt] = React.useState('');
    const [dropName, setDropName] = React.useState('');

    const [value, setValue] = React.useState(0);
    const [metaData, setMetaData] = React.useState({
        tokenId:'',
        dropName:'',
        tokenTitle:'',
        description:'',
        mediaLink:''
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
        startsAt:'',
        endsAt:'',
        dropName:''
    });

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const onChangeMetaData = (event) => {
        const obj = {};
        obj[event.target.name] = event.target.value;
        setMetaData({...metaData, ...obj})
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

    const metaDataSubmit = () => {
        const metadata = {
            token_type:metaData.tokenId,
            drop_name: metaData.dropName,
            metadata: {
                // title: metaData.tokenTitle,
                description: metaData.description,
                media: metaData.mediaLink
            },
        };
        if(metadata.token_type === ''){
            alert('Please fill complete form!')
        }
        if(metadata.drop_name === ''){
            alert('Please fill complete form!')
        }
        if(metadata.metadata.title === ''){
            alert('Please fill complete form!')
        }
        if(metadata.metadata.description === ''){
            alert('Please fill complete form!')
        }
        if(metadata.metadata.media === ''){
            alert('Please fill complete form!')
        } else {
            insertMetadata(metadata.token_type,metadata.metadata,metadata.drop_name)
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

    const dropSubmit = () => {


        let startsAtDate = new Date(startsAt);
        let endsAtDate = new Date(endsAt);

        let unixStartsAtTimestamp = Math.floor(startsAtDate.getTime() / 1000);
        let unixEndsAtTimestamp = Math.floor(endsAtDate.getTime() / 1000);
        const dropData = {
            starts_at: parseInt(unixStartsAtTimestamp),
            ends_at: parseInt(unixEndsAtTimestamp),
            drop_name: drop.dropName
        };
        // if(dropData.starts_at === ''){
        //     alert('Please fill complete form!')
        // }
        // if(dropData.ends_at === ''){
        //     alert('Please fill complete form!')
        // }
        if(startsAt === ''){
            alert('Please fill complete form!')
        }
        if(endsAt === ''){
            alert('Please fill complete form!')
        }
        if(dropData.drop_name === ''){
            alert('Please fill complete form!')
        } else{
            dropsInsert(dropData.starts_at,dropData.ends_at,dropData.drop_name)
        }

    }

    const priceSubmit = () => {

        const priceData = {
            token_id: price.tokenId,
            price: price.price,
        };
        if(priceData.token_id === ''){
            alert('Please fill complete form!')
        }
        if(priceData.price === ''){
            alert('Please fill complete form!')
        } else{
            nftPriceInsert(priceData.token_id,priceData.price)

        }

    }

    const removeDropSubmit = () => {

        if(dropName === ''){
            alert('Please fill complete form!')
        } else{
            removeDrop(dropName)

        }

    }

    return (
        <Paper sx={{ marginTop: '10px' }} elevation={0}>
            <Grid container marginLeft="8px" marginRight="8px" style={{justifyContent: 'center', flexDirection:'vertical'}}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab label="Insert Metadata" {...a11yProps(0)} />
                        <Tab label="Supply" {...a11yProps(1)} />
                        <Tab label="Add Drop" {...a11yProps(2)} />
                        <Tab label="Remove Drop" {...a11yProps(3)} />
                        <Tab label="Price Insert" {...a11yProps(4)} />

                    </Tabs>
                </Box>
            </Grid>
            <Grid container marginLeft="8px" marginRight="8px" style={{justifyContent: 'center', flexDirection:'vertical'}}>
            <TabPanel style={{width:'30%'}} value={value} index={0}>
                    <Typography fontWeight='bold' variant="h4" color='#000'>Insert Metadata</Typography>

                    <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='tokenId'
                        value={metaData.tokenId}
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
                        value={metaData.dropName}
                        fullWidth
                        placeholder="Drop Name"
                        onChange={onChangeMetaData}
                        />
                    </div>
                    <div ></div>
                    <Typography style={{marginTop:'2%'}} fontWeight='' variant="h5" color='#909091'>Insert {metaData.tokenId} Metadata</Typography>

                    {/* <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='tokenTitle'
                        value={metaData.tokenTitle}
                        fullWidth
                        placeholder="Token Title"
                        onChange={onChangeMetaData}
                        />
                    </div> */}
                    <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='description'
                        value={metaData.description}
                        fullWidth
                        placeholder="Description"
                        onChange={onChangeMetaData}
                        />
                    </div>
                    <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='mediaLink'
                        value={metaData.mediaLink}
                        fullWidth
                        placeholder="Media Link"
                        onChange={onChangeMetaData}
                        />
                    </div>
                    <div style={{
                        marginTop:'4%'
                    }}>
                        <Button onClick={metaDataSubmit} variant='contained'>Submit</Button>
                    </div>
            </TabPanel>
            <TabPanel style={{width:'30%'}} value={value} index={1}>
                <Typography fontWeight='bold' variant="h4" style={{color:'#000'}} color='#000'>Supply</Typography>
                <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='tokenId'
                        value={supply.tokenId}
                        fullWidth
                        placeholder="Token ID"
                        onChange={onChangeSupply}
                        />
                    </div>
                    <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='supply'
                        value={supply.supply}
                        fullWidth
                        placeholder="Supply"
                        onChange={onChangeSupply}
                        />
                    </div>
                    <div style={{
                        marginTop:'4%'
                    }}>
                        <Button onClick={supplySubmit} variant='contained'>Submit</Button>
                    </div>
            </TabPanel>
            <TabPanel style={{width:'30%'}} value={value} index={2}>
                <Typography fontWeight='bold' variant="h4" color='#000'>Add Drop</Typography>
                <div style={{
                        marginTop:'1%'
                    }}>
                        {/* <TextField
                        name='startsAt'
                        value={drop.startsAt}
                        fullWidth
                        placeholder="Starts at"
                        onChange={onChangeDrop}
                        /> */}

                        <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
      fullWidth
        renderInput={(props) => <TextField fullWidth {...props} />}
        label="Starts At"
        value={startsAt}
        onChange={(newValue,) => {
            setStartsAt(newValue);
        }}
      />
    </LocalizationProvider>

                        
                               {/* <DateRangePicker
                                    ranges={[selectionRange]}
                                    onChange={()=>{}}
                                /> */}
                        {/* 
                        <div>
                            <DateTimePicker
                                width='100%'
                                className={{
                                    width:'300%',
                                    height:'100px'
                                }}
                                value={timeValue} 
                            />
                        </div> 
                        */}

                    </div>
                    <div style={{
                        marginTop:'2%'
                    }}>
                        {/* <TextField
                        name='endsAt'
                        value={drop.endsAt}
                        fullWidth
                        placeholder="Ends at"
                        onChange={onChangeDrop}
                        /> */}

                                            <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
      fullWidth
        renderInput={(props) => <TextField fullWidth {...props} />}
        label="Ends At"
        value={endsAt}
        onChange={(newValue) => {
            setEndsAt(newValue);
        }}
      />
    </LocalizationProvider>
                    </div>
                    <div style={{
                        marginTop:'2%'
                    }}>
                        <TextField
                        name='dropName'
                        value={drop.dropName}
                        fullWidth
                        placeholder="Drop Name"
                        onChange={onChangeDrop}
                        />
                    </div>
                    <div style={{
                        marginTop:'4%'
                    }}>
                        <Button onClick={dropSubmit} variant='contained'>Submit</Button>
                    </div>
            </TabPanel>
                        <TabPanel style={{width:'30%'}} value={value} index={4}>
                <Typography fontWeight='bold' variant="h4" color='#000'>Price</Typography>
                <div style={{
                        marginTop:'2%'
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
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='price'
                        value={price.price}
                        fullWidth
                        placeholder="Price"
                        onChange={onChangePrice}
                        />
                    </div>
                    <div style={{
                        marginTop:'4%'
                    }}>
                        <Button onClick={priceSubmit} variant='contained'>Submit</Button>
                    </div>
            </TabPanel>

            <TabPanel style={{width:'30%'}} value={value} index={3}>
                <Typography fontWeight='bold' variant="h4" color='#000'>Remove Drop</Typography>
                <div style={{
                        marginTop:'2%'
                    }}>
                        <TextField
                        name='drop<Name'
                        value={dropName}
                        fullWidth
                        placeholder="Drop Name"
                        onChange={(e)=>setDropName(e.target.value)}
                        />
                    </div>
                    <div style={{
                        marginTop:'4%'
                    }}>
                        <Button onClick={removeDropSubmit} variant='contained'>Submit</Button>
                    </div>
            </TabPanel>

            </Grid>

        </Paper>
    )

}
