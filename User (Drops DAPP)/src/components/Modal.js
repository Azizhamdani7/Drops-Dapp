import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Collection from './Collection';

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

      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
      <Collection dropName={dropName} nfts={nfts}/>
        </Box>
      </Modal> 


  );
}