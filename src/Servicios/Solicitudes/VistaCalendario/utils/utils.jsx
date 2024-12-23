import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { Tooltip, Typography, tooltipClasses } from '@mui/material';
import styles from '../CalendarioGrande.module.css';
import { estadoColors } from '../../../../Utils/randomColors';

export const isNumeric = (str) => !isNaN(str) && !isNaN(parseFloat(str));



const HtmlTooltip = styled(({ className, ...props }) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export const eventContent = ({ event }) => {
  return (
    <HtmlTooltip title={
      <React.Fragment>
        <div className={styles.tooltipEvent}>
          <Typography variant="body1" component="div">
            <strong>Tipo:</strong> {isNumeric(event.type) ? 'Vacaciones' : event.type}
          </Typography>
          <Typography variant="body1" component="div">
            <strong>Estado:</strong> {event.estado}
          </Typography>
        </div>
      </React.Fragment>
    }>
      <div className={styles.eventContent}>
        <span
          className={styles.eventCircle}
          style={{
            backgroundColor: estadoColors[event.estado.toLowerCase()],
          }}
        ></span>
        <span className={styles.eventTitle}>{event.title}</span>
      </div>
    </HtmlTooltip>
  );
};


export const eventPropGetter = (event) => {
  const newStyle = {
    backgroundColor: event.color,
    color: 'black',
    borderRadius: '5px',
    border: 'none',
    display: 'block',
    margin: '0px',
    padding: '1px 3px',
    fontSize: '0.8em',
  };
  return {
    className: '',
    style: newStyle,
  };
};

