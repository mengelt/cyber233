
import { Box, Container, Stack, Typography } from '@mui/material';


const Page = () => {
  

  return (
    <>
      
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={1}>
            <Typography variant="h4">
              Friends List
            </Typography>
          </Stack>
          <Stack
            spacing={3}
            sx={{ mt: 3 }}
          >
            

          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;