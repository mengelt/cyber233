import { Box, Container, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';

export const HomeHero = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'top center',
        backgroundImage: 'url("/assets/gradient-bg.svg")',
        pt: '120px'
      }}
    >
      <Container maxWidth="lg">
        <Box maxWidth="sm">
          <Typography
            variant="h1"
            sx={{ mb: 2 }}
          >
            Let us worry about your&nbsp;
            <Typography
              component="span"
              color="primary.main"
              variant="inherit"
            >
              Privacy
            </Typography>
            , you focus on being social.
          </Typography>
          <Typography
            color="text.secondary"
            sx={{
              fontSize: 20,
              fontWeight: 500
            }}
          >
            A privacy-first social network that puts you first -- well, second. Privacy is first, remember?
          </Typography>

        </Box>
        <Box
          sx={{
            pt: '120px',
            position: 'relative'
          }}
        >

        </Box>
      </Container>
    </Box>
  );
};
