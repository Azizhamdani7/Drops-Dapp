import * as React from 'react';
import { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Collection from './Collection';
import { useContext } from 'react';
import { NearContext } from "../provider/NearProvider";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  height:680,
  overflow: "auto",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({nfts, dropName, open, handleClose }) {

  return (

    <div> <p onClick={handleClose}>close</p>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
      <Collection dropName={dropName} nfts={nfts}/>
        </Box>
      </Modal> 
      </div>


  );
}