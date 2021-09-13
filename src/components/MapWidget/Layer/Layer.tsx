import React, { useContext, useEffect, useState } from 'react';
import clsx from 'clsx';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import LayerItem from './LayerItem';
import { groupBy, cloneDeep, values as toValues } from 'lodash';
import { Divider, IconButton, List, ListSubheader } from '@material-ui/core';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import { SideToolbarListContext } from '../../Home/src';
import Core from '../../../Core';
import { ILayer } from '../../../Core/LayerController/Layer';
import GroupLayer from '../../../Core/LayerController/GroupLayer';
import { Viewer } from 'cesium';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    list: {
      maxHeight: 500,
      overflow: "auto"
    },
    subHeader: {
      display: "flex",
      justifyContent: "space-between",
      background: theme.palette.background.default
    },
    hide: {
      maxHeight: 0,
      overflow: "hidden",
      transition: theme.transitions.create('max-height', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    open: {
      maxHeight: 999,
      transition: theme.transitions.create('max-height', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    layerGroup: {
      
    }
  }),
);


const groupLayerValues = ( values: Array<ILayer> ) =>
{
    const grouped = groupBy( values, "group" )
    return toValues( grouped )
}

interface IGroupItemState {
  name: string
  hide: boolean
}


const Layer = () => {
  const classes = useStyles();

  const { layerList, setLayerList } = useContext(SideToolbarListContext)
  const [groupedValue, setgroupedValue] = useState<ILayer[][]>( [layerList] )
  const [groupedStates, setgroupedStates] = useState<IGroupItemState[]>([])

  useEffect( () => {
    const getLayers = async () =>
    {
        const groupedLayers = groupLayerValues( layerList )
        setgroupedValue( groupedLayers )
        setgroupedStates( groupedLayers.map( group => ({
          name: group[0].group || "其他",
          hide: false
        })) )
    }
    getLayers()
    
  }, [Core.layerController.state])

  const handleLayerToggle = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
      const layerId = event.target.value
      const checked = event.target.checked
      const layer = Core.layerController.getById(layerId)
      Core.viewerTask.execute( (viewer: Viewer) =>
      {
        const handleLoadingEvent = ( resp: boolean ) => {
          console.log(resp)
          Core.layerController.refreshState()
          setLayerList(Core.layerController.state)
        }
        if ( checked ) {
          layer.loadToMap(viewer)
          layer.onLoading.addEventListener( handleLoadingEvent )
        } else {
          layer.removeFromMap()
          layer.onLoading.removeEventListener(handleLoadingEvent)
        }
      } )
      layer.show = checked
      Core.layerController.refreshState()
      setLayerList(Core.layerController.state)
  }

  const handleLayerClick = ( id: number | string | undefined ) =>
  {
    if ( id !== undefined ) {
      const layer = Core.layerController.getById(id)
      Core.viewerTask.execute( (viewer: Viewer) =>
      {
        if ( layer.mapEntity !== null ) {
          viewer.flyTo( layer.mapEntity )
        }
      })
    }

  }

  const handleGroupToggle = (groupName: string | undefined) =>
  {
    const clonedSource = cloneDeep(groupedStates)
    const index = clonedSource.findIndex( item => item.name === groupName )
    if ( index >= 0 ) {
      const targetItem = clonedSource[index]
      clonedSource[index].hide = !targetItem.hide
      setgroupedStates(clonedSource)
    }


  }

  const isGroupedShouldHide = ( groupName: string | undefined ) => {
    const targetItem = groupedStates.find( item => item.name === groupName)
    if ( targetItem !== undefined ) {
      return targetItem.hide
    }
    return false
  }

  return (
    <div className={classes.root}>
        {groupedValue.map( ( groupItem, index ) => (
            <div key={index}>
                <List 
                    className={classes.list}
                    component="nav" 
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader className={classes.subHeader} component="div" id="nested-list-subheader">
                            {groupItem[0].group}
                            <IconButton onClick={() => handleGroupToggle(groupItem[0].group)}><ExpandLessIcon/></IconButton>
                        </ListSubheader>
                    }>
                      <div className={clsx(classes.layerGroup, {
                        [classes.hide]: isGroupedShouldHide(groupItem[0].group),
                        [classes.open]: !isGroupedShouldHide(groupItem[0].group)
                      })} key={index}>
                        {groupItem.map( (item, itemIndex) =>(
                            <LayerItem key={itemIndex} {...item} 
                              onLayerToggle={handleLayerToggle} 
                              onLayerClick={handleLayerClick}/>
                        ))}
                      </div>   
                </List>
                <Divider />
            </div>
            
        ) )}
      
    </div>
  );
}

export default Layer