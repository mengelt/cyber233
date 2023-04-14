import { useCallback, useEffect, useState } from 'react';
import { Box, Container, Stack, Typography } from '@mui/material';
import { socialApi } from 'src/api/social';
import { Seo } from 'src/components/seo';
import { useMounted } from 'src/hooks/use-mounted';
import { SocialPostAdd } from 'src/sections/dashboard/social/social-post-add';
import { SocialPostCard } from 'src/sections/dashboard/social/social-post-card';

const usePosts = () => {
  const isMounted = useMounted();
  const [posts, setPosts] = useState([]);

  const handlePostsGet = useCallback(async () => {
    try {
      const response = await socialApi.getFeed();

      if (isMounted()) {
        setPosts(response);
      }
    } catch (err) {
      console.error(err);
    }
  }, [isMounted]);

  useEffect(() => {
      handlePostsGet();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []);

  return posts;
};

const Page = () => {
  

  return (
    <>
      <Seo title="Dashboard: Social Feed" />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8
        }}
      >
        <Container maxWidth="lg">
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              New Post
            </Typography>
            <Typography variant="h4">
              What is on your mind?
            </Typography>
          </Stack>
          <Stack
            spacing={3}
            sx={{ mt: 3 }}
          >
            <SocialPostAdd />

          </Stack>
        </Container>
      </Box>
    </>
  );
};

export default Page;