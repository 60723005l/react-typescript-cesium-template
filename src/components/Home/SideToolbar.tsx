import React, { useContext, useEffect, useRef, useState } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import clsx from 'clsx';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { SideToolbarListContext } from './src';
import { ISideToolbarItem } from './src/interface';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { TabPanel } from '.';

const SIDEBAR_WIDTH = 65
const PANEL_WIDTH = 250

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: "100vh",
      flexDirection: "row",
      width: SIDEBAR_WIDTH,
    },
    tabGroup: {

    },
    tabsContainer: {
      display: 'flex',
      flexDirection: "column"
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    tab: {
      minWidth: SIDEBAR_WIDTH
    },
    panelContainer: {
      display: 'flex',
      flexDirection: "column",
      zIndex: 1,
      background: "#ffffffc4"
    },
    panelOpen: {
      minWidth: PANEL_WIDTH,
      width: PANEL_WIDTH,
      transition: theme.transitions.create('width, min-width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    panelClose: {
      transition: theme.transitions.create('width, min-width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: 0,
      minWidth: 0,
      [theme.breakpoints.up('sm')]: {
        width: 0,
        minWidth: 0,
      },
    },
  }),
);

const a11yProps = (index: any) => {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}


const SideToolbar = () => {
  const classes = useStyles();
  const root_ref = useRef<HTMLDivElement>(null)
  const { activeItem, setActiveItem, list } = useContext(SideToolbarListContext)
  const [value, setValue] = useState(0)
  const [open, setopen] = useState(false)

  const handleClickOutside = (event: MouseEvent) => {
    if (!root_ref.current?.contains((event.target) as Node)) {
      setopen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [])

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  }
  const handleItemClick = (item: ISideToolbarItem) => {
    console.log(root_ref)

    setActiveItem(item.name)
    if (open && item.name === activeItem.name) {
      setopen(false)
    }
    if (!open) {
      setopen(true)
    }
  };

  return (
    <div className={classes.root} ref={root_ref}>
      <div className={classes.tabsContainer}>
        <Toolbar className="tSpace" />
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          textColor="primary"
          className={classes.tabs}
        >
          {list.map((item, index) => (
            <Tab className={classes.tab} icon={<item.icon />}
              {...a11yProps(index)} key={index}
              onClick={() => handleItemClick(item)} />
          ))}
        </Tabs>
      </div>
      <div className={clsx(classes.panelContainer, {
        [classes.panelOpen]: open,
        [classes.panelClose]: !open,
      })}>
        <Toolbar className="tSpace" />
        {list.map((item, index) => (
          <TabPanel key={index} value={value} index={index} >
            {<item.children {...item.props} />}
          </TabPanel>
        ))}
      </div>


    </div>
  )
}

export default SideToolbar