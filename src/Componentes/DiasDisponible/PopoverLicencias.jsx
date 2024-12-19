import React from "react";
import { Popover, Card, Typography, List, ListItem, ListItemButton, ListItemText, ListItemIcon } from "@mui/material";

import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import SchoolIcon from '@mui/icons-material/School';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PregnantWomanIcon from '@mui/icons-material/PregnantWoman';
import HealingIcon from '@mui/icons-material/Healing';
import ChildFriendlyIcon from '@mui/icons-material/ChildFriendly';
import FireplaceIcon from '@mui/icons-material/Fireplace';
import MovingIcon from '@mui/icons-material/Moving';

const icons = {
    "Fallecimiento 1": SentimentVeryDissatisfiedIcon,
    "Fallecimiento 2": SentimentVeryDissatisfiedIcon,
    "Casamiento": FavoriteBorderIcon,
    "Día de estudio": SchoolIcon,
    "Casamiento hijo": GroupAddIcon,
    "Maternidad": PregnantWomanIcon,
    "Cuidado familiar": HealingIcon,
    "Nacimiento": ChildFriendlyIcon,
    "Siniestro vivienda": FireplaceIcon,
    "Mudanza": MovingIcon,
};

const PopoverLicencias = ({ open, handleClose, licencias, setLicencia }) => {

    const handlerClick = (licencia, Icon) => {
        setLicencia({
            tipo: licencia,
            icono: Icon
        })
        handleClose()
    }

    return (
        <Popover
            open={open}
            onClose={handleClose}
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
        >
            <Card sx={{ p: 2, minWidth: 200 }}>
                <List sx={{ p: 0 }} >
                    {licencias.map((item, index) => {
                        const Icon = icons[item];
                        return (
                            <ListItem key={index} disablePadding>
                                <ListItemButton onClick={() => handlerClick(item, Icon)}>
                                    <ListItemIcon>
                                        <Icon/>
                                    </ListItemIcon>
                                    <ListItemText primary={item} />
                                </ListItemButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Card>
        </Popover>
    );
};

export default PopoverLicencias;
