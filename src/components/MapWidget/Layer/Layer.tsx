import React, { useEffect, useState } from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import LayerItem from './LayerItem';
import { ILayerItem } from './interface';
import { groupBy, values as toValues } from 'lodash';
import { Divider, List, ListSubheader } from '@material-ui/core';

const Fake_data = [
    {
        id:0,
        name: "layer1",
        type: "string",
        show: true,
        group: "group1",
    },
    {
        id:1,
        name: "layer2",
        type: "string",
        show: true,
        group: "group1",
    },
    {
        id:2,
        name: "layer3",
        type: "string",
        show: true,
        group: "group2",
    },
  ]
const FakeFetch = async () =>
{
    setTimeout( () => {
        return Fake_data
    },2000)
}


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);


const groupLayerValues = ( values: Array<ILayerItem> ) =>
{
    const grouped = groupBy( values, "group" )
    return toValues( grouped )
}

type Props = {
    values: Array<ILayerItem>
}
const Layer = ( { values }: Props ) => {
  const classes = useStyles();
  const [groupedValue, setgroupedValue] = useState<ILayerItem[][]>( [values] )

  useEffect( () => {
    const getLayers = async () =>
    {
        // const resp = await FakeFetch()
        setgroupedValue( groupLayerValues( values ) )
    }
    getLayers()
    
  }, [values])

  const handleLayerToggle = (event: React.ChangeEvent<HTMLInputElement>) =>
  {
      const layerId = event.target.value
    console.log(event.target)
  }

  return (
    <div className={classes.root}>
        {groupedValue.map( ( groupItem, index ) => (
            <div key={index}>
                <List 
                    component="nav" 
                    aria-labelledby="nested-list-subheader"
                    subheader={
                        <ListSubheader component="div" id="nested-list-subheader">
                            {groupItem[0].group}
                        </ListSubheader>
                    }>
                        {groupItem.map( (item, itemIndex) =>(
                            <LayerItem key={itemIndex} {...item} onLayerToggle={handleLayerToggle} />
                        ))}
                        
                </List>
                <Divider />
            </div>
            
        ) )}
      
    </div>
  );
}

export default Layer