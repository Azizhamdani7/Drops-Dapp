import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from './Modal'
import { useContext } from 'react';
import { NearContext } from "../provider/NearProvider";


export default function MediaCard({title, starts_at, ends_at}) {

  const [open, setOpen] = React.useState(false);
  const [nfts, setNfts] = React.useState([]);

      const {
        fetchDropNfts,
    } = useContext(NearContext);


  const fetchNfts = async () => {
    const nfts = await fetchDropNfts(title);

    if(nfts && nfts.length){
        setNfts([...nfts]); 
    }


}
  const handleOpen = async () => {

    await fetchNfts();
    setOpen(true)

};

  const timeConverter = (UNIX_timestamp) => {
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    return time;
  }
  const handleClose = () => setOpen(false);

  return (
    <Card style={{ margin: '5px', background:'#F4F4F4'}} sx={{ maxWidth: 365 }} >
      { open &&  <Modal nfts={nfts} dropName={title} open={open} handleClose={handleClose}/> }
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {'Start Date: '}{timeConverter(starts_at)}
        </Typography>
        <Typography style={{marginTop:'2%'}} variant="body2" color="text.secondary">
          {'End Date: '}{timeConverter(ends_at)}
        </Typography>
        <CardActions>
            <Button onClick={handleOpen} size='small'>View Nfts</Button>
        </CardActions>
      </CardContent>
    </Card>
  );
}