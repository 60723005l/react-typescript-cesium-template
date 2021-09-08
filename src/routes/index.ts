import Loading from '../pages/Loading';
import { RouteItem } from './interface';
import Loadable from 'react-loadable';

const Home = Loadable({
    loader: () => import('../pages/Home'),
    loading: Loading
})



  //note: https://iter01.com/48207.html
  const routes: Array<RouteItem> = [
    {path: '/', exact: true, component: Home},
    // {path: '/Loading', exact: true, component: LoadingPage},
    // {path: '/Home', component: Home, routes: [
    //   {path: '/Home', exact: true, component: About},
    //   {path: '/Home/skill', exact: true, component: Skill},
    //   {path: '/Home/project', exact: true, component: Project},
    // ]},
    // {
    //   path: '/:user/demos', component: Demos,
    //   routes:[
    //     {path: '/:user/demos/:demotitle', component: DemoView},
    //   ]
    // },
  ]
  export default routes