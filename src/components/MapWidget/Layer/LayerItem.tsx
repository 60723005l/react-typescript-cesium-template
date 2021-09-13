import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import {Checkbox, CircularProgress } from '@material-ui/core';
import { ILayerItem } from './interface';
import { ILayer } from '../../../Core/LayerController/Layer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

interface Props extends ILayer {
    key: number | string | undefined,
    onLayerToggle: (event: React.ChangeEvent<HTMLInputElement>) => void,
    onLayerClick: ( id: number | string | undefined ) => void
}
const LayerItem = ( { id, name, show, loading, onLayerToggle, onLayerClick  }: Props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
         <ListItem button={true}>
         <Checkbox
            value={id}
            onChange={onLayerToggle}
            checked={show}
            color="primary"
            inputProps={{ 'aria-label': 'secondary checkbox' }}
            />
            {/* <Button value={id} onClick={onLayerClick}>{name}</Button> */}
            <ListItemText primary={name} onClick={() => onLayerClick(id)}/>
            { loading? 
              (<CircularProgress size={20} />):
              ""
            }
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}
    </div>
  );
}

export default LayerItem