import React, { useContext, useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import { SideToolbarListContext } from './src';
import { ISideToolbarItem } from './src/interface';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import { Divider, IconButton, Tab, Tabs, Toolbar } from '@material-ui/core';
import { TabPanel } from '.';
import Layer from "../../Core/LayerController/Layer"
import * as api from "../../api"
import Core from '../../Core';
import { Viewer } from 'cesium';

const SIDEBAR_WIDTH = 50
const PANEL_WIDTH = 250

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      backgroundColor: theme.palette.background.paper,
      display: 'flex',
      height: "100vh",
      flexDirection: "row",
      width: 0,//SIDEBAR_WIDTH,
      position: "absolute",
      zIndex: 1
    },
    tabGroup: {

    },
    tabsContainer: {
      display: 'flex',
      flexDirection: "column"
    },
    tabs: {
      // borderRight: `1px solid ${theme.palette.divider}`,
      background: theme.palette.background.default,
      borderRadius: 5,
    },
    tab: {
      minWidth: SIDEBAR_WIDTH
    },
    panelContainer: {
      display: 'flex',
      flexDirection: "column",
      zIndex: 1,
      background: theme.palette.background.default,
      // overflow: "auto",
      height: "100%"
    },
    // contentHeader: {
    //   // position: "sticky",
    //   // top: theme.mixins.toolbar.height,
    //   // left: 0,
    //   zIndex: 2,
    //   background: theme.palette.background.default
    // },
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
    variant: "contained"
  };
}


const SideToolbar = () => {
  const classes = useStyles();
  const root_ref = useRef<HTMLDivElement>(null)

  const { activeItem, setActiveItem, list, setLayerList } = useContext(SideToolbarListContext)

  const [value, setValue] = useState(0)
  const [open, setopen] = useState(false)

  useEffect(() => {
    const fetchBuildings = async () => {
      const resp = await api.buildings.getServiceList()
      const buildings = resp.data.LAYERS.BUILDING

      const layers: Array<Layer> = buildings.map((item: any) => {
        return new Layer({
          name: item.Name,
          type: "3DTILE",
          group: "3DTILE",
          data: { url: item.Url }
        })
      })
      const layerInfoList = layers.map( layer => layer.info)
      Core.viewerTask.execute( (viewer: Viewer) => {
        layers.forEach( layer => {
          Core.layerController.add(layer)
        })
      })
      
      setLayerList( layerInfoList )

    }

    fetchBuildings()
  }, [])

  const handleClickOutside = (event: MouseEvent) => {
    // if (!root_ref.current?.contains((event.target) as Node)) {
    //   setopen(false)
    // }
    ""
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
  const handleTabClick = (item: ISideToolbarItem) => {
    setActiveItem(item.name)
    if (open && item.name === activeItem.name) {
      setopen(false)
    }
    if (!open) {
      setopen(true)
    }
  };

  const handlePanelHide = () =>
  {
    setopen(false)
  }

  return (
    <div className={classes.root} ref={root_ref}>
      <div className={clsx(classes.panelContainer, {
        [classes.panelOpen]: open,
        [classes.panelClose]: !open,
      })}>
        <Toolbar className="tSpace" />
        {/* <div className={classes.contentHeader}>
            <IconButton color="primary" onClick={handlePanelHide}><FirstPageIcon /></IconButton>
            <Divider/>
        </div> */}
        
        {list.map((item, index) => (
          <TabPanel key={index} value={value} index={index} onPanelHide={handlePanelHide}>
            {<item.children {...item.props} />}
          </TabPanel>
        ))}
      </div>
      
      <div className={classes.tabsContainer}>
        <Toolbar className="tSpace" />
        <Tabs
          orientation="vertical"
          // variant="scrollable"
          indicatorColor="primary"
          value={value}
          onChange={handleChange}
          aria-label="Vertical tabs example"
          textColor="primary"
          className={classes.tabs}
        >
          {list.map((item, index) => (
            <Tab className={classes.tab} icon={<item.icon />}
              {...a11yProps(index)} key={index}
              onClick={() => handleTabClick(item)} />
          ))}
        </Tabs>
      </div>
      


    </div>
  )
}

export default SideToolbar