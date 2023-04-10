import { Box, Container } from '@mui/material';
import { Seo } from 'src/components/seo';
import { Previewer } from 'src/sections/components/previewer';
import { Typography1 } from 'src/sections/components/typography/typography-1';

const Page = () => {

  return (
    <>
      <Seo title="Components: Typography" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Previewer title="Typography">
            <Typography1 />
          </Previewer>
        </Container>
      </Box>
    </>
  );
};

export default Page;
