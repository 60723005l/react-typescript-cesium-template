import React from 'react';
// import TabContext from '@material-ui/lab/TabContext';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import IconButton from '@material-ui/core/IconButton';
import { Divider } from '@material-ui/core';

// import Tabs from '@material-ui/core/Tabs';
// import Tab from '@material-ui/core/Tab';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      position: "relative",
      // height: "100%",
      overflow: "auto"
      // top: theme.mixins.toolbar.height
    },
    panelContent: {
      display: "flex",
      flexDirection: "column",
      width: "100%"
    },
    contentHeader: {
      position: "sticky",
      top: 0,
      left: 0,
      zIndex: 2,
      background: theme.palette.background.default
    }
  }),
);


interface TabPanelProps {
  children?: React.ReactNode;
  index: any;
  value: any;
  onPanelHide: () => void;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, onPanelHide, ...other } = props;

  const classes = useStyles()

  return (
    <div
      className={classes.root}
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      
      {value === index && (
        // children
        <div className={classes.panelContent}>
          <div className={classes.contentHeader}>
            <IconButton color="primary" onClick={onPanelHide}><MenuOpenIcon /></IconButton>
            <Divider/>
          </div>
          
          {children}
        </div>
          
      )}
    </div>
  );
}
export default TabPanel