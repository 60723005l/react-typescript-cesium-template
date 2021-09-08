import React from 'react';
import { CesiumViewer } from "../components/CesiumViewer";
import {  RouteComponentProps } from "react-router-dom";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { SideToolbar } from '../components/Home';


const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerClose: {
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        overflowX: 'hidden',
        width: theme.spacing(7) + 1,
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9) + 1,
        },
      },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerContainer: {
      overflow: 'auto',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    mapcontent: {
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
    },
    sideToolbar: {
        display: "flex",
        flexDirection: "column",
        zIndex: 1,
        height: "100vh",
        background: theme.palette.background.default
    }
  }),
);

const Home = (props: RouteComponentProps<any>) =>
{
    const classes = useStyles();
    return (
        // <div className="home-container">
        //     <CesiumViewer  />

        // </div>
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                <Typography variant="h6" noWrap>
                    Clipped drawer
                </Typography>
                </Toolbar>
            </AppBar>
            <SideToolbar/>
            <main className={classes.content}>
                <Toolbar />
                <div className={classes.mapcontent}><CesiumViewer /></div>
                
            </main>
            </div>
        );
        
        
    
}

export default Home