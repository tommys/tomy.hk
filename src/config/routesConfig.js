// src/routesConfig.js
import Main from '../views/Main';
import Logs from '../views/Logs';
import Shows from '../views/Shows';
import OnePizza from '../components/OnePizza';
import CategoryPage from '../components/CategoryPage';
import TagPage from '../components/TagPage';
import MonthYearPage from '../components/MonthYearPage';
import AllArticlesPage from '../components/AllArticlesPage';
import ExploreRedirect from '../components/ExploreRedirect';
import DriversPage from '../components/DriversPage';
import CurrentF1CalendarPage from '../components/CurrentF1CalendarPage';

const routes = [
  {
    path: '/',
    component: Main,
    name: 'main',
  },
  {
    path: '/logs',
    component: Logs,
    name: 'logs',
  },
  {
    path: '/Shows',
    component: Shows,
    name: 'shows',
  },
  {
    path: '/',
    component: Main
  },
  {
    path: '/explore/:slug',
    component: OnePizza
  },
  {
    path: '/explore/category/:category',
    component: CategoryPage,
  },
  {
    path: '/explore/tag/:tag',
    component: TagPage,
  },
  {
    path: '/explore/date/:year/:month',
    component: MonthYearPage,
  },
  {
    path: '/explore/archive',
    component: AllArticlesPage,
  },
  {
    path: '/explore',
    component: ExploreRedirect,
  },
{
    path: '/drivers',
    component: DriversPage,
  },
  {
    path: '/current',
    component: CurrentF1CalendarPage,
  },
];

export default routes;
