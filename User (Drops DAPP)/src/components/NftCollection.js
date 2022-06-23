import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from './NftCard';
import Typography from '@mui/material/Typography';

export default function Collection({ nfts, dropName, notPurchase }) {
  return (
    <div>
        <Typography style={{ marginTop:20, marginLeft:'3%'}} gutterBottom variant="h5" component="div">
          NFTs Collection
        </Typography>
        <Grid container style={{ paddingTop:0, padding: '3%'}} spacing={{ xs: 2, md: 2, lg: 2 }} columns={{ xs: 6, sm: 8, md: 10, lg: 12 }}>
          {nfts?.map(( nft , index) => (
          <Grid item xs={2} sm={4} md={4} lg={4} key={index}>
            <Card price={nft.price} notPurchase={true} dropName={dropName} nft={nft} title={nft.title} description={nft.description} media={nft.media} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}