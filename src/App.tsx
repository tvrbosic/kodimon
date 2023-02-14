import { BrowserRouter } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';

import './sass/global.scss';
import theme from './theme/theme';
import AppRouter from './router/AppRouter';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </ChakraProvider>
  );
}

export default App;
