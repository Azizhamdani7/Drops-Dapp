import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";

// import Modal from './Modal'
import { useContext } from 'react';
import { NearContext } from "../provider/NearProvider";

export default function MediaCard({ notPurchase, nft, title, description, media, dropName}) {

  const [price, setPrice] = React.useState(0);
  const [openAmount, setOpenAmount] = React.useState(false);
  const [numberOfTokens, setNumberOfTokens] = React.useState(0);


//   const handleOpen = () => setOpen(true);
//   const handleClose = () => setOpen(false);
console.log(media);

const {
  nftPurchase,
  fetchDropNfts,
  nftPriceView,
} = useContext(NearContext);

  const openPurchase = async () => {
    await getPriceSubmit();

    setOpenAmount(true);
    console.log(nft)
    
    // if(purchaseData.tokenId === ''){
    //   return alert('Please fill complete form!')
    // }
    // if(purchaseData.dropName === ''){
    //     return alert('Please fill complete form!')
    // }
    // if(purchaseData.accountId === ''){
    //     return alert('Please fill complete form!')
    // }
    // if(purchaseData.numberOfTokens === ''){
    //     return alert('Please fill complete form!')
    // }
    // if(purchaseData.amount === ''){
    //     return alert('Please fill complete form!')
    // } 
    // else {
    //     // tokenId, dropName,numberOfTokens,amount,accountId
    //     nftPurchase(purchaseData.tokenId, purchaseData.dropName,parseInt(purchaseData.numberOfTokens), purchaseData.amount, purchaseData.accountId)
    // }
  }
  const purchaseNftSubmit = async () => {
    console.log({title:nft.title,dropName,numberOfTokens})
    nftPurchase(nft.title,dropName,numberOfTokens);
  }

  const getPriceSubmit = async () => {
    // if(amount === ''){
    //     alert('Please fill complete form!')
    // } else{
        const nftPrice = await nftPriceView(nft.title);
        console.log('price**********************************',nftPrice)
        setPrice(nftPrice); 
        return nftPrice
    // }
}

// getPriceSubmit()
  // React.useEffect(async ()=>{
  //   await getPriceSubmit()
  // },[nft])

  return (
    <Card style={{ margin: '5px', background:'#F4F4F4'}} sx={{ maxWidth: 365 }} >
      {/* <Modal open={open} handleClose={handleClose}  tokenId={tokenId} contractAddress={contractAddress} chain={chain}/> */}
      <CardMedia
        component="img"
        height="200"
        image={media}
        // alt="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {'Title: '}{title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'Description: '}{description}
        </Typography>
        {(openAmount && !notPurchase) && <Typography variant="body2" color="text.secondary">
          {'Price: '}{price}
        </Typography>}
        { openAmount && <div style={{
                        marginTop:'1%'
                    }}>
                        <TextField
                        name='amount'
                        value={numberOfTokens}
                        fullWidth
                        placeholder="No. of tokens"
                        onChange={(e)=>setNumberOfTokens(e.target.value)}
                        />
                    </div>}

        { (!openAmount && !notPurchase) && <CardActions>
            <Button onClick={openPurchase} size='small'>Purchase</Button>
        </CardActions>}
        {openAmount && <CardActions>
            <Button onClick={purchaseNftSubmit} size='small' variant='contained'>Purchase</Button>
        </CardActions>}
        { openAmount && <div>  <Button onClick={()=>setOpenAmount(false)} size='small'>Cancel</Button> </div>}
      </CardContent>
    </Card>
  );
}