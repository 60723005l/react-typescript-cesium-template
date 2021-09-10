import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Checkbox from '@material-ui/core/Checkbox';
import { ILayerItem } from './interface';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
  }),
);

interface Props extends ILayerItem {
    key: number,
    onLayerToggle: (event: React.ChangeEvent<HTMLInputElement>) => void
}
const LayerItem = ( { id, name, show, onLayerToggle  }: Props) => {
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
            <ListItemText primary={name} />
        </ListItem>
        {/* <Divider variant="inset" component="li" /> */}
    </div>
  );
}

export default LayerItem