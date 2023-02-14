import { Box, Container, Image } from '@chakra-ui/react';

import kodiLogo from '../assets/images/kodi-logo.svg';
import kodimonBanner from '../assets/images/kodimon.png';

export default function Banner() {
  return (
    <Box position={'relative'}>
      <Container centerContent>
        <Image
          src={kodiLogo}
          position="absolute"
          zIndex={-1}
          transform="rotate(-30deg)"
          alt="Kodi logo"
        />
        <Image src={kodimonBanner} mt={16} alt="Kodimon banner" />
      </Container>
    </Box>
  );
}
