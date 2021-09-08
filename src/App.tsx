import React, { FC, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import { HashRouter, Switch } from 'react-router-dom'
import RouteWithSubRoutes from './routes/RouteWithSubRoutes';
import routes from './routes';
import * as I from './theme/interface'
import light from "./theme/light"


const App: FC = () => {


  return (
    <HashRouter>
      <ThemeProvider theme={light} >
        <Switch>
          {
            routes.map( ( route, i ) =>
              (
                <RouteWithSubRoutes key={i} {...route}/>
              ))
          }
        </Switch>
      </ThemeProvider>
    </HashRouter>

  );
}

export default App;
