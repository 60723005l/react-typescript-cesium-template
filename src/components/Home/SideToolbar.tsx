import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import MailIcon from '@material-ui/icons/Mail';
import LayersIcon from '@material-ui/icons/Layers';
import { Button } from "@material-ui/core";
import Icon from '@material-ui/core/Icon';

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    sideToolbar: {
        position: "fixed",
        top: "0px",
        left: "0px",
        display: "flex",
        flexDirection: "column",
        zIndex: 1,
        height: "100vh",
        background: theme.palette.background.default,
        [theme.breakpoints.between('xs', 'sm')]: {
            position: "fixed",
            bottom: 0,
            top: "auto",
            width: "100vw",
            display: "flex",
            flexDirection: "row",
            height: "auto",
            justifyContent: "center",
            overflow: "auto"
        },
        "& .tSpace": {
            [theme.breakpoints.between('xs', 'sm')]: {
                display: "none"
            },
        }
    }
  }),
);


const SideToolbar = () =>
{
    const classes = useStyles();

    return(
        <div className={classes.sideToolbar}>
            <Toolbar className="tSpace"/>
            {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
                <Button key={text}>
                    <LayersIcon />
                </Button>
                
            ))}
        </div>
    )
}

export default SideToolbar