import { CircularProgress } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";
import React, { FC } from "react";

const useStyle = makeStyles( () =>
    ({
        loading:{
            position: "absolute",
            top: "0px",
            left: "0px",
            height: "100%",
            width: "100%"
        },
        circle:{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        }
    }))


const Loading = () =>
{
    const classes = useStyle()
    return(
        <div className={classes.loading}>
            <div className={classes.circle}>
                <CircularProgress/>
            </div>
        </div>
    )
}

export default Loading