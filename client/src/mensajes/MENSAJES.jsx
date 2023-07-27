import React from 'react';
import { Modal, Box, Typography, Button } from '@mui/material';

const ErrorModal = ({ isOpen, onRequestClose, errorMessage }) => {
  return (
    <Modal open={isOpen} onClose={onRequestClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 300,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2,
        }}
      >
      
        <Typography variant="body1" gutterBottom>
          {errorMessage}
        </Typography>
        <Button onClick={onRequestClose} variant="contained">
          Cerrar
        </Button>
      </Box>
    </Modal>
  );
};

export default ErrorModal;