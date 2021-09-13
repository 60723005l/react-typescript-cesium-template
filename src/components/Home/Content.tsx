import React from 'react';
import { CesiumViewer } from '../CesiumViewer';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    content: {
      flexGrow: 1,
      position: "relative",
      top: "64px",
      height: "calc(100vh - 64px)",
      width: "100vw",
    },
    mapcontent: {
        height: "100%",
        width: "100%",
    }
  }),
);


const Content = () =>
{
    const classes = useStyles()
    return(
        <main className={classes.content}>
            <div className={classes.mapcontent}>
                {/* <Toolbar /> */}
                <CesiumViewer />
            </div>
        </main>
    )
}

export default Content