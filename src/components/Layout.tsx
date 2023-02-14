import { Outlet } from 'react-router-dom';
import { Box } from '@chakra-ui/react';

function Layout() {
  return (
    <Box height="100vh" px="20" py="5">
      <Outlet />
    </Box>
  );
}

export default Layout;
