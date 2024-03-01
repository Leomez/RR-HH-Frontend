import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideError } from '../Redux/Features/Error/errorSlice';
import { Modal, Dialog, DialogTitle, Typography } from '@mui/material';


const ErrorModal = () => {
  const dispatch = useDispatch();
  const showErrorModal = useSelector(state => state.error.showErrorModal);
  const errorMessage = useSelector(state => state.error.errorMessage);

  const handleClose = () => {
    dispatch(hideError());
  };

  return (
    <div>
      <Dialog open={showErrorModal} onClose={handleClose}>
        <DialogTitle>
          <Typography>{errorMessage}</Typography>
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

export default ErrorModal;