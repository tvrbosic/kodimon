// BrowserRouter is replaced with HashRouter to be able to deploy to GitHub pages
// import { BrowserRouter as Router } from 'react-router-dom';
import { HashRouter as Router } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import './sass/global.scss';
import theme from './theme/theme';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <AppRouter />
      </Router>
    </ChakraProvider>
  );
}

export default App;
