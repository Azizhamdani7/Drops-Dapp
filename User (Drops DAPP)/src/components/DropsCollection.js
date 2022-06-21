import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from './DropCard';
import Typography from '@mui/material/Typography';

export default function DropsCollection({notPurchase, drops }) {
  return (
    <div>
        <Typography style={{ marginTop:20, marginLeft:'3%'}} gutterBottom variant="h5" component="div">
          Drops
        </Typography>
        <Grid container style={{ paddingTop:0, padding: '3%'}} spacing={{ xs: 2, md: 2, lg: 2 }} columns={{ xs: 6, sm: 8, md: 10, lg: 12 }}>
          {drops?.map(( drop , index) => (
          <Grid item xs={2} sm={4} md={4} lg={4} key={index}>
            <Card notPurchase={notPurchase} title={drop.drop_name} ends_at={drop.ends_at} starts_at={drop.starts_at}/>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}