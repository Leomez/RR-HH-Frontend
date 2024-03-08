import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideError } from '../Redux/Features/Error/errorSlice';
import { Modal, Dialog, DialogTitle, Typography, Button } from '@mui/material';


export const ErrorModal = () => {
  const dispatch = useDispatch();
  const showErrorModal = useSelector(state => state.error.showErrorModal);
  const errorMessage = useSelector(state => state.error.errorMessage);
  const [open, setOpen] = useState(showErrorModal)

  const handleClose = () => {
    setOpen(false)
    dispatch(hideError());
  };
console.log(errorMessage);
  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>
          <Typography>{errorMessage}</Typography>
          <Button variant='outlined' color='info'>Cerrar</Button>
        </DialogTitle>
      </Dialog>
      {/* <Modal open={true} onClose={handleClose}>
        <p>hola</p>
      </Modal> */}
      {/* // (
      //   <div className="modal">
      //     <div className="modal-content">
      //       <span className="close" onClick={handleClose}>&times;</span>
      //       <p>{errorMessage}</p>
      //     </div>
      //   </div>
      // ) */}
      
    </div>
  );
};

// export default ErrorModal;