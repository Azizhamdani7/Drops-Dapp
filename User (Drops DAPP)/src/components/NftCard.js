import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { TextField } from "@mui/material";
import { useContext } from 'react';
import { NearContext } from "../provider/NearProvider";

export default function MediaCard({ notPurchase, nft, title, description, media, dropName}) {

  const [price, setPrice] = React.useState(0);
  const [openAmount, setOpenAmount] = React.useState(false);
  const [numberOfTokens, setNumberOfTokens] = React.useState(null);

const {
  nftPurchase,
  nftPriceView,
} = useContext(NearContext);

  const openPurchase = async () => {
    await getPriceSubmit();
    setOpenAmount(true);
  }

  const purchaseNftSubmit = async () => {
    console.log({title:nft.title,dropName,numberOfTokens})
    nftPurchase(nft.title,dropName,numberOfTokens);
  }

  const getPriceSubmit = async () => {

        const nftPrice = await nftPriceView(nft.title);
        console.log('price**********************************',nftPrice)
        setPrice(nftPrice); 
        return nftPrice
}

  return (
    <Card style={{ margin: '5px', background:'#F4F4F4'}} sx={{ maxWidth: 365 }} >
      <CardMedia
        component="img"
        height="200"
        image={media}
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