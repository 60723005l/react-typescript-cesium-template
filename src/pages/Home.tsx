import React from 'react';
import { RouteComponentProps } from "react-router-dom";
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { SideToolbar, Header, Content } from '../components/Home';
import { SideToolbarProvider } from '../components/Home/src';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    sideGroup: {
      // display: "flex",
      // flexDirection: "row"
    }
  }),
);



const Home = (props: RouteComponentProps<any>) => {
  const classes = useStyles();

  return (
    <SideToolbarProvider>
      <div className={classes.root}>
        <CssBaseline />
        <Header />
        <div className={classes.sideGroup}>
          <SideToolbar />
          {/* <TabPanel/> */}
        </div>

        <Content />
      </div>
    </SideToolbarProvider>

  );
}

export default Home