import { useRoutes } from 'react-router-dom';

import Home from '../screens/home/Home';
import Layout from '../components/Layout';
import Game from '../screens/game/Game';

function AppRouter() {
  let element = useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'game', element: <Game /> },
      ],
    },
  ]);

  return element;
}

export default AppRouter;
